import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

import CourseModel from '../models/courseDetails.js';

const getCourses = async () => {
  /**
   * Writes to data/courses in JSON, an array of Course objects. 
   * Each Course object will have an array of Index objects.
   * Each Index object will have an array of Lesson objects.
   * 
   * Example of Course object:
   * {
   *  courseCode: "AAA08B",
   *  courseName: "FASHION & DESIGN: WEARABLE ART AS A SECOND SKIN*~",
   *  courseAUs: "3.0 AU",
   *  indexes: [
   *    {
   *      indexNo: "39632",
   *      lessons: [
   *        {
   *          type: "LEC/STUDIO",
   *          group: "L1",
   *          day: "WED",
   *          venue: "NIE7-02-07",
   *          teachingWeeks: "Teaching Wk1-12", // if empty, assume weeks 1-13
   *          startTime: Date object,
   *          endTime: Date object, // NOTE: possible to have no startTime and endTime
   *        }
   *      ]
   *    }
   *  ]
   * }
   */

  console.log("Retrieving courses from NTU...");

  const acadSem = await getAcadSem();

  try {
    const config = {
      params: {
        'acadsem': acadSem,
        'r_search_type': 'F',
        'boption': 'Search',
        'staff_access': "false",
      }
    }

    // used query strings to get data
    // approach used in getExams is similar to actual approach used by NTU website - can consider switching if query strings break in the future
    const { data } = await axios.get("https://wish.wis.ntu.edu.sg/webexe/owa/AUS_SCHEDULE.main_display1", config);
    const $ = cheerio.load(data);
    
    const courses = [];
    let course;
    $('table').each((i, element) => {
      if (i % 2 == 0) { // course info
        const courseCode = $(element).find('td[width="100"] > b > font[color="#0000FF"]').text();
        const courseName = $(element).find('td[width="500"] > b > font[color="#0000FF"]').text();
        const courseAUs = $(element).find('td[width="50"] > b > font[color="#0000FF"]').text().trim();
        // console.log(courseCode, courseName, courseAUs);
        course = {
          courseCode,
          courseName,
          courseAUs,
          indexes: [],
        }
      } else { // indexes info
        let index;

        $(element).find('tr').each((j, row) => {
          if (j == 0) { // skip header row
            return;
          }

          let info = [] // [indexNo, type, group, day, time, venue, teachingWeeks]
          $(row).find('td').each((k, cell) => {
            info.push($(cell).text());
          })
          const indexNo = info[0];
          const type = info[1];
          const group = info[2];
          const day = info[3];
          const time = info[4].split("-");
          const venue = info[5];
          const teachingWeeks = info[6];

          // split time into start and end times
          let startTime = null;
          let endTime = null;
          try {
            let startTimeStr = `${time[0].substring(0,2)}:${time[0].substring(2)}:00`;
            startTime = new Date(`Januaray 1 2021 ${startTimeStr}`);

            let endTimeStr = `${time[1].substring(0,2)}:${time[1].substring(2)}:00`;
            endTime = new Date(`Januaray 1 2021 ${endTimeStr}`);
          } catch (err) { // index has no time
            let errorMsg = `Failed to get startTime and endTime for Course ${course.courseCode} Index ${indexNo}. Time retrieved is ${info[4]}`;
            console.log(errorMsg);
          }

          if (indexNo) { // new index
            if (index) {
              course.indexes.push(index);
            }
            index = { // make new index
              indexNo,
              lessons: [],
            };
          } 

          // add lesson to index
          let lesson = {
            type,
            group,
            day,
            venue,
            teachingWeeks,
          };
          if (startTime !== null && endTime !== null) {
            lesson = {
              ...lesson,
              startTime,
              endTime,
            }
          }
          index.lessons.push(lesson); 
        });

        if (index) { // push last index
          course.indexes.push(index);
        }
        courses.push(course);
      }
    });

    const coursesJSON = JSON.stringify(courses);
    const fileName = `scrapper/data/courses/${acadSem}_courses_${Date.now()}.json`
    fs.writeFile(fileName, coursesJSON, (err) => {
      if (err) console.log(err);
    });
    console.log("Retrieved courses");

    return courses;
  } catch (error) {
    console.log(error);
  }
}

const getAcadSem = async () => {
  try {
    const { data } = await axios.get("https://wish.wis.ntu.edu.sg/webexe/owa/aus_schedule.main");
    const $ = cheerio.load(data);

    const acadSem = $('select[name="acadsem"] > option[selected="selected"]').attr('value');
    return acadSem;
  } catch (err) {
    console.log(err);
  }
}

export const addCoursesToDB = async () => {
  const courses = await getCourses();

  const dropped = await CourseModel.collection.drop();
  if (dropped) {
    console.log("CourseModel dropped")
  }
  
  for (let i = 0; i < courses.length; i++) {
    let course = new CourseModel(courses[i]);
    await course.save((err) => {
      if (err) console.log(err);
      else console.log(`Added Course ${courses[i].courseCode} to database.`)

      if (i === courses.length-1) console.log("All courses added successfully.")
    })
  }
  
}

// addCoursesToDB();