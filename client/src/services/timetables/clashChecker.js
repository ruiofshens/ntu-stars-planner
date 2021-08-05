const DaysEnum = {
  MON: 1,
  TUE: 2,
  WED: 3,
  THU: 4,
  FRI: 5,
  SAT: 6,
  SUN: 7,
}

class ClashChecker {

  checkLessonClash(lesson, timetable) {
    for (let module of timetable) {
      for (let currLesson of module.index.lessons) {
        // if lessons are on the same day, check
        // 1) timing clash: Start of new lesson < End of old lesson && End of new lesson > Start of old lesson
        // 2) if clash, check if teaching weeks overlap
        if (DaysEnum[lesson.day] === DaysEnum[currLesson.day]) {
          if (lesson.startTime < currLesson.endTime && lesson.endTime > currLesson.startTime) { 
            if (this.checkTeachingweeksClash(lesson.teachingWeeks, currLesson.teachingWeeks)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  checkExamClash(examDocs) {
    let result = { clash: false };

    for (let i = 0; i < examDocs.length-1; i++) {
      let examA = examDocs[i];
      for (let j = i+1; j < examDocs.length; j++) {
        let examB = examDocs[j];
        if (examA !== null && examB !== null){
          if (examA.examDate < examB.endTime && examA.endTime > examB.examDate) {
            result.clash = true;
            result.clashed = [examA, examB];
            return result;
          }
        }
      }
    }

    return result;
  }

  checkTeachingweeksClash(teachingWeeksA, teachingWeeksB) {
    /**
     * Possible teaching weeks:
     * 1) Teaching Wk2-13 (or any other 2 numbers)
     * 2) Teaching Wk1,3,5,... (or any other combination of weeks)
     * 3) Teaching Wk1-3,5-7 (range + combination)
     * 4) "" (empty string - means will happen every week)
     * 5) "Not conducted during teaching weeks" / "Asychronous online learning" / etc - assume it'll never clash
     * 6) Teaching Wk2 (single week only)
     */

    // one of them happens every week - so will clash
    if ((teachingWeeksA === "" && teachingWeeksB.includes("Teaching Wk")) || (teachingWeeksB === "" && teachingWeeksA.includes("Teaching Wk"))) { 
      return true;
    }

    if (teachingWeeksA.includes("Teaching Wk") && teachingWeeksB.includes("Teaching Wk")) { // both have specific teaching weeks - so must check clash
      teachingWeeksA = teachingWeeksA.substring(teachingWeeksA.indexOf("Wk")+2); // removes "Teaching Wk"
      teachingWeeksB = teachingWeeksB.substring(teachingWeeksB.indexOf("Wk")+2);

      let arrayWeeksA = this.#getIndivWeeks(teachingWeeksA);
      let arrayWeeksB = this.#getIndivWeeks(teachingWeeksB);
      for (let week of arrayWeeksA) {
        if (arrayWeeksB.includes(week)) {
          return true;
        }
      }

      return false;
    }

    // ignore format 5
    return false;
  }

  #getIndivWeeks(teachingWeeksStr) {
    let weeksArray = [];

    if (teachingWeeksStr.includes(",")) { // formats 2 and 3
      weeksArray = teachingWeeksStr.split(",");

      // check for format 3
      for (let i = 0; i < weeksArray.length; i++) {
        let week = weeksArray[i];
        if (week.includes("-")) { 
          let startWeek = parseInt(week.split("-")[0]);
          let endWeek = parseInt(week.split("-")[1]);

          // replace range with individual weeks
          weeksArray.splice(i, 1);
          for (let indivWeek = startWeek; indivWeek <= endWeek; indivWeek++) {
            weeksArray.push("" + indivWeek); // put as str for consistency
          }
        }
      }
    } else if (teachingWeeksStr.includes("-")) { // format 1 only
      let startWeek = parseInt(teachingWeeksStr.split("-")[0]);
      let endWeek = parseInt(teachingWeeksStr.split("-")[1]);
      for (let week = startWeek; week <= endWeek; week++) {
        weeksArray.push(""+week);
      }
    } else { // format 6
      weeksArray.push(teachingWeeksStr);
    }

    return weeksArray;
  }
}

export default new ClashChecker();