import ClashChecker from "./clashChecker.js";
import { fetchCourses, fetchExams, fetchVacanciesAndWaitlist } from "../DataRetriever.js";

class TimetablesGenerator {

  async generateAll(allCourses, courseCodes, chosenIndexes, freeTimes, miscConstraints) {
    /**
     * Refer to CourseSelectionPage for more details regarding the last 3 parameters
     * @param courseCodes array of course codes
     * @param chosenIndexes an object with courseCodes as keys and array of selected indexes (numbers) as values
     * @param freeTimes array of time slots to be left free (e.g. 0-08:00 = Monday 8-830am, 1-free-day = Tuesday free day)
     * @param miscConstraints object with boolean values. Keys are constraints to be considered
     */

    courseCodes = courseCodes.filter(courseCode => courseCode); // remove empty strings
    // retrieve courses and exams from db
    let courses = allCourses.filter(courseObj => courseCodes.includes(courseObj.courseCode));
    let exams = await fetchExams(courseCodes);

    // check for exam clash first
    let examClashResult = ClashChecker.checkExamClash(exams);
    if (examClashResult.clash) {
      return {
        canGenerate: false,
        clashed: examClashResult.clashed,
      };
    }

    // fetch vacancies (and waitlist) and add to courses
    for (let courseCode of courseCodes) {
      let module = courses.filter(module => module.courseCode === courseCode)[0];
      const indexes = await fetchVacanciesAndWaitlist(courseCode);
      if (indexes.length !== 0) { 
        for (let index of module.indexes) {
          let vacanciesAndWaitlist = indexes.filter(currIndex => currIndex.indexNo === index.indexNo)[0];
          index.vacancies = vacanciesAndWaitlist.vacancies;
          index.waitlistLength = vacanciesAndWaitlist.waitlistLength;
        }
      } else {
        for (let index of module.indexes) {
          index.vacancies = "NA";
          index.waitlistLength = "NA";
        }
      }
    }
    
    // create non-clashing timetables
    let timetables = [];
    this.#generateTimetables(courses, exams, 0, [], timetables);

    // filter generated timetables based on constraints
    this.#filterIndexes(timetables, chosenIndexes);
    this.#filterFreeTimes(timetables, freeTimes);
    if (miscConstraints.noBackToBack) this.#filterNoBackToBack(timetables);

    return {
      canGenerate: true,
      timetables,
    };
  }

  #generateTimetables(courses, exams, i, timetable, timetables) {
    let currentModule = courses[i];
    let currentModuleExam = exams[i];
  
    for (let index of currentModule.indexes) {
      let clash = false;
      for (let lesson of index.lessons) {
        if (ClashChecker.checkLessonClash(lesson, timetable)) {
          clash = true;
          break;
        }
      }
      if (clash) {
        continue;
      }
      
      // no clash - add course with this index to timetable
      let toAdd = {
        courseCode: currentModule.courseCode,
        courseName: currentModule.courseName,
        courseAUs: currentModule.courseAUs,
        examStart: currentModuleExam !== null ? 
          new Date(currentModuleExam.examDate).toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', weekday: 'short', hour: '2-digit', minute: '2-digit'}) : null,
        examEnd: currentModuleExam !== null ? new Date(currentModuleExam.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null,
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

  #filterIndexes(timetables, chosenIndexes) {
    /**
     * Iterates through the generated timetables and remove any timetable that does not use the indexes specified in chosenIndexes
     */
    for (let i=0; i<timetables.length; i++) {
      for (let mod of timetables[i]) {
        if (chosenIndexes[mod.courseCode].length === 0) { // no indexes selected for this mod
          continue;
        }
        if (!chosenIndexes[mod.courseCode].includes(mod.index.indexNo)) { 
          timetables.splice(i, 1);
          i--;
          break;
        }
      }
    }
  }

  #filterFreeTimes(timetables, freeTimes) {
    if (freeTimes.length === 0) return;
    
    // first format freeTimes values into actual Date objects
    const dates = { 
      0: "MON",
      1: "TUE",
      2: "WED",
      3: "THU",
      4: "FRI", 
      5: "SAT",
    }
    const freeTimeObjs = [];
    freeTimes.forEach(timeSlot => {
      let day = dates[timeSlot[0]];
      let time = timeSlot.slice(2);
      let startTime;
      let endTime;
      if (time === 'free-day') {
        startTime = new Date("January 1 2021 08:00");
        endTime = new Date("January 1 2021 23:00");
      } else {
        startTime = new Date(`January 1 2021 ${time}`);
        endTime = new Date(startTime.getTime() + 30*60*1000); // time slots are in half-hour
      }
      freeTimeObjs.push({startTime, endTime, day});
    });

    // remove all timetables with lessons in these time slots
    for (let i=0; i<timetables.length; i++) {
      let removed = false;
      for (let mod of timetables[i]) {
        for (let lesson of mod.index.lessons) {
          for (let freeTime of freeTimeObjs) {
            if (lesson.day === freeTime.day && new Date(lesson.startTime) < freeTime.endTime && new Date(lesson.endTime) > freeTime.startTime) {
              timetables.splice(i, 1);
              i--;
              removed = true;
              break;
            }
          } 
          if (removed) break;
        }
        if (removed) break;
      }
    }
  }

  #filterNoBackToBack(timetables) {
    for (let i=0; i<timetables.length; i++) {
      let removed = false;
      const allLessons = {
        MON: [],
        TUE: [],
        WED: [],
        THU: [],
        FRI: [],
        SAT: [],
      };
      timetables[i].forEach((mod, i) => mod.index.lessons.forEach(lesson => {
        allLessons[lesson.day].push(lesson);
      }));

      for (let lessons of Object.values(allLessons)) {
        for (let j=0; j<lessons.length-1; j++) {
          for (let k=j+1; k<lessons.length; k++) {
            // convert all to milliseconds for comparison purposes (cannot compare Date objects directly)
            let lessonStartJ = new Date(lessons[j].startTime).getTime();
            let lessonEndJ = new Date(new Date(lessons[j].endTime).getTime() + 10*60*1000).getTime(); // add 10min because lessons end 10min before every half hour
            let lessonStartK = new Date(lessons[k].startTime).getTime();
            let lessonEndK = new Date(new Date(lessons[k].endTime).getTime() + 10*60*1000).getTime(); // add 10min because lessons end 10min before every half hour
            if (lessonStartJ === lessonEndK || lessonEndJ === lessonStartK) { // if either lesson starts at the same time the other lesson ends
              timetables.splice(i, 1);
              i--;
              removed = true;
              break;
            }
          }
          if (removed) break;
        }
        if (removed) break;
      }
    }
  }
}

export default new TimetablesGenerator();