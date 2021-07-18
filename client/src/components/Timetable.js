import React, { useContext, useEffect, useRef, useState } from 'react';

import { Container } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

import { CurrentPlanContext } from '../contexts/CurrentPlanContext';

import Lesson from '../components/Lesson';

//TODO:  reduce code repetition
function Timetable() {

  return (
      <Container fluid style={{padding: "0 1vw"}}>
        <TimeRow />
        <TimetableRow day="Mon" />
        <TimetableRow day="Tue" />
        <TimetableRow day="Wed" />
        <TimetableRow day="Thu" />
        <TimetableRow day="Fri" />
        <TimetableRow day="Sat" />
      </Container>
  );
}

// Contains the cells for each day as a row, excluding the day itself
function TimetableRow({ day }) {
  const { currentPlan } = useContext(CurrentPlanContext);
  const lessonsArray = [];
  const [maxHeight, setMaxHeight] = useState(0);

  // each time slot is 6.2vw, i.e. 60min == 6.4vw ==> 1min = 8/75vw
  const ratio = 6.2/60;

  const calculateLessonWidth = (startTime, endTime) => {
    startTime = new Date(startTime);
    endTime = new Date(endTime);

    // need to add 10 min to endTime because lessons end 10min "earlier"
    let lessonDuration = (new Date(endTime.getTime() + 10*60*1000) - startTime) / (1000*60);
    return (lessonDuration * ratio) + "vw";
  }

  const calculateLessonOffset = (startTime) => {
    startTime = new Date(startTime);

    // day text takes up 4vw
    const startingHour = new Date("January 1 2021 8:00"); // 8am
    let offsetInMin = (startTime - startingHour) / (1000*60);
    return (offsetInMin * ratio + 4) + "vw";
  }

  //Kinda hack-ish way to fix overlap of lessons, should consider refactoring into clashChecker.js
  const handleOverlap = (newLessonWidth, newLessonStart) => {
    const newLessonEnd = newLessonStart + newLessonWidth;
    let newLesson;
    for (let lesson of lessonsArray) {
      if (newLessonStart < lesson.endTime && newLessonEnd > lesson.startTime){
          newLesson = {
            startTime: newLessonStart, 
            endTime: newLessonEnd, 
            //If lesson that it clashed with is not offset, add offset to the new lesson and vice versa
            verticalOffset: (lesson.verticalOffset === "6vh") ? "0vh" : "6vh",
            height: "50%"
          };
          lessonsArray.push(newLesson);
          return newLesson;
      }
    }

    //Lesson does not overlap
    newLesson = {
      startTime: newLessonStart, 
      endTime: newLessonEnd, 
      verticalOffset: "0vh",
      height: "100%"
    };
    lessonsArray.push(newLesson);
    return newLesson;
  }

  //https://flatuicolors.com/palette/tr
  const colorArray = [
    "#17c0eb", //Spiro Disco Ball
    "#cd84f1", //Bright Lilac
    "#ffaf40", //Mandarin Sorbet
    "#3ae374", //Weird Green
    "#67e6dc", //Hammam Blue
    "#ffb8b8", //Young Salmon
    "#ff4d4d", //Light Red
  ]

  return (
    <ListGroup horizontal className="position-relative timetableRow">
      {currentPlan.map((mod,index) => {
        return (
          <>
            {mod.index.lessons.map(lesson => {
              if (lesson.day === day.toUpperCase()) {
                const lessonWidth = calculateLessonWidth(lesson.startTime, lesson.endTime);
                const lessonOffset = calculateLessonOffset(lesson.startTime);
                const overlapStyle = handleOverlap(lessonWidth, lessonOffset);
                return (
                  <Lesson 
                    width={lessonWidth}
                    // height={overlapStyle.height}
                    offset={lessonOffset}
                    verticalOffset={overlapStyle.verticalOffset}
                    color={colorArray[index]}
                    courseCode={mod.courseCode}
                    type={lesson.type}
                    group={lesson.group}
                    venue={lesson.venue}
                    teachingWeeks={lesson.teachingWeeks}
                    maxHeight={maxHeight}
                    setMaxHeight={setMaxHeight}
                  />
                )
              }
            })}
          </>
        )
      })}
      
      <ListGroup.Item className="dayCell timetableRow" style={{height: `${maxHeight}px`}}>
        {day}
      </ListGroup.Item>
      {Array(15).fill().map((e, i) => {
        if (i%2 === 0) {
          return <ListGroup.Item key={i} className="timeSlot timetableRow" style={{height: `${maxHeight}px`}}/>
        } else {
          return <ListGroup.Item key={i} className="timeSlot altColor timetableRow" style={{height: `${maxHeight}px`}}/>
        }
      })}
      
    </ListGroup>
  );
}

function TimeRow() {
  return (
    <>
      <ListGroup horizontal className="timeRow">
        <ListGroup.Item className="dayCell border-0" style={{backgroundColor: 'white'}}></ListGroup.Item>
        {Array(15).fill("").map((e, i) => (
          <ListGroup.Item key={i} className="timeSlot timeCell border-0 text-center">
            <time>{i+8 < 10 ? "0"+(i+8) : i+8}:00</time>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default Timetable;

/*
Some thoughts:
- will probably need to explicitly define height: need a min. height that scales with text
- lessons must follow the same height, and for rows (days) with height > min.height the lesson must somehow know of the new height as well
- rather than fitting the lesson in the cells it's prob better to just place it in front: makes it easier to pass in lesson data and fewer code reptition as well
- to do so will need to also set a fix width
- the cells will have to be a component
- then the lesson must be placed in front of that component
*/