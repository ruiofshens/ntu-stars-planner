import React, { useRef, useState, useEffect } from 'react';
import Lesson from './Lesson';
import ClashChecker from '../services/timetables/clashChecker';

const OverlappedLessons = (props) => {
  // check if lessons are merely overlapped, or actually clashes with each other (in terms of teaching weeks)
  // clashes instead of overlap happens when the user edits the indexes manually
  for (let i=0; i<props.lessons.length-1; i++) {
    for (let j=i+1; j<props.lessons.length; j++) {
      let curr = props.lessons[i];
      let next = props.lessons[j];
      if (!curr.clashed) { // doesn't have any clashes *yet* - if it already clashes we can simply skip the check
        console.log("teachingWeeks:", curr.teachingWeeks, next.teachingWeeks)
        if (ClashChecker.checkTeachingweeksClash(curr.teachingWeeks, next.teachingWeeks)) {
          curr.clashed = true;
          next.clashed = true;
          console.log("clashed~")
        }
      } else {
        console.log("why")
      }
    }
  }

  return (
    <div id="overlappedLessons" style={{position: "absolute", zIndex: 1}}>
      {props.lessons.map(lesson => {
        const lessonWidth = props.calculateLessonWidth(lesson.startTime, lesson.endTime);
        const lessonOffset = props.calculateLessonOffset(lesson.startTime);
        return (
          <Lesson 
            width={lessonWidth}
            offset={lessonOffset}
            position={"static"}
            color={lesson.color}
            courseCode={lesson.courseCode}
            type={lesson.type}
            group={lesson.group}
            venue={lesson.venue}
            teachingWeeks={lesson.teachingWeeks}
            clashed={lesson.clashed}
          />
        )
      })}
    </div>
  )
}

export default OverlappedLessons;