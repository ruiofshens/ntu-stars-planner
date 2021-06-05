import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

const getCourses = async () => {
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

    const { data } = await axios.get("https://wish.wis.ntu.edu.sg/webexe/owa/AUS_SCHEDULE.main_display1", config);
    const $ = cheerio.load(data);
    
    const courses = [];
    let course;
    $('table').each((i, element) => {
      if (i % 2 == 0) { // course info
        const courseCode = $(element).find('td[width="100"] > b > font[color="#0000FF"]').text();
        const courseName = $(element).find('td[width="500"] > b > font[color="#0000FF"]').text();
        const courseAUs = $(element).find('td[width="50"] > b > font[color="#0000FF"]').text().trim();
        console.log(courseCode, courseName, courseAUs);
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
          const time = info[4];
          const venue = info[5];
          const teachingWeeks = info[6];

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
            time,
            venue,
            teachingWeeks,
          };
          index.lessons.push(lesson); 
        });

        if (index) { // push last index
          course.indexes.push(index);
        }
        courses.push(course);
      }
    });

    const coursesJSON = JSON.stringify(courses);
    
    const fileName = `data/${acadSem}.json`
    fs.writeFile(fileName, coursesJSON, (err) => {
      if (err) console.log(err);
    });
    console.log("Done")
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

getCourses();