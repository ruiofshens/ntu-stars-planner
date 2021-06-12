import CourseModel from "./models/courseDetails.js";

const DaysEnum = {
  MON: 1,
  TUE: 2,
  WED: 3,
  THU: 4,
  FRI: 5,
  SAT: 6,
  SUN: 7,
}

export const getTimetables = async (courseCodes) => {
  // retrieve courses from db
  let courses = []
  for (let courseCode of courseCodes) {
    let courseDoc = await getCourseFromDB(courseCode);
    courses.push(courseDoc);
  }

  // create non-clashing timetables
  let timetables = [];
  generateTimetables(courses, 0, [], timetables);
  console.log(timetables);
}

const generateTimetables = (courses, i, timetable, timetables) => {
  let currentModule = courses[i];
  
  for (let index of currentModule.indexes) {
    console.log(`${currentModule.courseCode}: ${index.indexNo}`);
    let clash = false;
    for (let lesson of index.lessons) {
      if (checkClash(lesson, timetable)) {
        clash = true;
        break;
      }
    }
    if (clash) {
      console.log("Clashed - continuing to next index");
      continue;
    }
    
    // no clash - add course with this index to timetable
    console.log("No clash!");
    let toAdd = {
      courseCode: currentModule.courseCode,
      courseName: currentModule.courseName,
      courseAUs: currentModule.courseAUs,
      index,
      indexNo: index.indexNo, // temp
    }
    timetable.push(toAdd);

    // add next module
    if (i !== courses.length-1) {
      generateTimetables(courses, i+1, timetable, timetables);
    } else {
      timetables.push([...timetable]);
    }

    // pop current module / index
    timetable.pop();
  } 
}

const checkClash = (lesson, timetable) => {
  const lessonStart = lesson.startTime;
  const lessonEnd = lesson.endTime;
  for (let module of timetable) {
    for (let currLesson of module.index.lessons) {
      let currStart = currLesson.startTime;
      let currEnd = currLesson.endTime;
      
      // check timing clash: Start of new lesson < End of old lesson && End of new lesson > Start of old lesson
      // but only if both lessons are on the same day
      if (DaysEnum[lesson.day] === DaysEnum[currLesson.day]) {
        if (lessonStart < currEnd && lessonEnd > currStart) { 
          console.log(`new lesson starts ${lessonStart.toLocaleTimeString()} but this lesson ends ${currEnd.toLocaleTimeString()}`);
          console.log(`new lesson ends ${lessonEnd.toLocaleTimeString()} but this lesson starts ${currStart.toLocaleTimeString()}`);
          return true;
        }
      }

      // check exam
      // check teaching weeks
    }
  }
  return false;
}

export const getCourseFromDB = async (courseCode) => {
  console.log(`Retrieving ${courseCode} from database...`);
  try {
    const courseDoc = await CourseModel.findOne({ courseCode });
    console.log(`Retrieved ${courseCode}`);
    return courseDoc;
  } catch (error) {
    console.log(error.message);
  }
}