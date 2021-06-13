import CourseModel from "../models/courseDetails.js";
import ExamModel from "../models/examDetails.js";
import { checkTimeClash, checkExamClash } from "./clashLogic.js";

const getTimetables = async (courseCodes) => {
  // retrieve courses and exams from db
  let courses = [];
  let exams = []
  for (let courseCode of courseCodes) {
    let courseDoc = await getCourseFromDB(courseCode);
    courses.push(courseDoc);
    let examDoc = await getExamFromDB(courseCode);
    exams.push(examDoc);
  }

  // check for exam clash first
  let examClashResult = checkExamClash(courseCodes);
  if (examClashResult.clash) {
    console.log("Clashed exams:", examClashResult.clashed);
    return {
      canGenerate: false,
      timetables: examClashResult.clashed,
    };
  }

  // create non-clashing timetables
  let timetables = [];
  generateTimetables(courses, 0, [], timetables);
  return {
    canGenerate: true,
    timetables,
  };
}

const generateTimetables = (courses, i, timetable, timetables) => {
  let currentModule = courses[i];
  
  for (let index of currentModule.indexes) {
    console.log(`${currentModule.courseCode}: ${index.indexNo}`);
    let clash = false;
    for (let lesson of index.lessons) {
      if (checkTimeClash(lesson, timetable)) {
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

const getCourseFromDB = async (courseCode) => {
  console.log(`Retrieving ${courseCode} from database...`);
  try {
    const courseDoc = await CourseModel.findOne({ courseCode });
    console.log(`Retrieved ${courseCode}`);
    return courseDoc;
  } catch (error) {
    console.log(error.message);
  }
}

const getExamFromDB = async (courseCode) => {
  console.log(`Retrieving exam details for ${courseCode} from database...`);
  try {
    const examDoc = await ExamModel.findOne({ courseCode });
    console.log(`Retrieved exam details for ${courseCode}`);
    return examDoc;
  } catch (error) {
    console.log(error.message);
  }
}

export default getTimetables;