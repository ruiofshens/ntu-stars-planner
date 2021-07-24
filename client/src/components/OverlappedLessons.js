import React, { useRef, useState, useEffect } from 'react';
import Lesson from './Lesson';

const OverlappedLessons = (props) => {
  // const ref = useRef(null);

  // useEffect(() => {
  //   const height = ref.current.clientHeight;
  //   if (height > props.maxHeight) {
  //       props.setMaxHeight(height);
  //   }
  // }, [])

  return (
    <div id="overlappedLessons" style={{position: "absolute", zIndex: 1}}>
      {props.lessons.map(lesson => {
        const lessonWidth = props.calculateLessonWidth(lesson.startTime, lesson.endTime);
        const lessonOffset = props.calculateLessonOffset(lesson.startTime);
        return (
          <Lesson 
            width={lessonWidth}
            // height={overlapStyle.height}
            offset={lessonOffset}
            // verticalOffset={overlapStyle.verticalOffset}
            position={"static"}
            color={lesson.color}
            courseCode={lesson.courseCode}
            type={lesson.type}
            group={lesson.group}
            venue={lesson.venue}
            teachingWeeks={lesson.teachingWeeks}
          />
        )
      })}
    </div>
  )
}

export default OverlappedLessons;