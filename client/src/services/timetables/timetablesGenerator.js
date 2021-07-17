import ClashChecker from "./clashChecker.js";
import { fetchCourses, fetchExams, fetchVacanciesAndWaitlist } from "../DataRetriever.js";

class TimetablesGenerator {

  async generateAll(courseCodes) {
    courseCodes = courseCodes.filter(courseCode => courseCode); // remove empty strings
    // retrieve courses and exams from db
    let courses = await fetchCourses(courseCodes);
    let exams = await fetchExams(courseCodes);
    // let courses = [];
    // let exams = []
    // for (let courseCode of courseCodes) {
    //   let courseDoc = await getCourseFromDB(courseCode);
    //   courses.push(courseDoc);
    //   let examDoc = await getExamFromDB(courseCode);
    //   exams.push(examDoc);
    // }

    // check for exam clash first
    let examClashResult = ClashChecker.checkExamClash(exams);
    if (examClashResult.clash) {
      console.log("Clashed exams:", examClashResult.clashed);
      return {
        canGenerate: false,
        timetables: examClashResult.clashed,
      };
    }

    // create non-clashing timetables
    let timetables = [];
    this.#generateTimetables(courses, exams, 0, [], timetables);
    return {
      canGenerate: true,
      timetables,
    };
  }

  #generateTimetables(courses, exams, i, timetable, timetables) {
    let currentModule = courses[i];
    let currentModuleExam = exams[i];
  
    for (let index of currentModule.indexes) {
      console.log(`${currentModule.courseCode}: ${index.indexNo}`);
      let clash = false;
      for (let lesson of index.lessons) {
        if (ClashChecker.checkLessonClash(lesson, timetable)) {
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
        examStart: currentModuleExam !== null ? new Date(currentModuleExam.examDate).toLocaleString() : null,
        examEnd: currentModuleExam !== null ? new Date(currentModuleExam.endTime).toLocaleTimeString() : null,
        index,
      }
      timetable.push(toAdd);

      // add next module
      if (i !== courses.length-1) {
        this.#generateTimetables(courses, exams, i+1, timetable, timetables);
      } else {
        timetables.push([...timetable]);
      }

      // pop current module / index
      timetable.pop();
    }
  }
}

export default new TimetablesGenerator();