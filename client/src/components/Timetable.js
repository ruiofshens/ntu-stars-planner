import React, { useContext } from 'react';

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

  // each time slot is 6.4vw, i.e. 60min == 6.4vw ==> 1min = 8/75vw
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

  return (
    <ListGroup horizontal className="timetableRow position-relative">
      <ListGroup.Item className="dayCell">{day}</ListGroup.Item>
      {Array(15).fill().map((e, i) => {
        if (i%2 === 0) {
          return <ListGroup.Item className="timeSlot" />
        } else {
          return <ListGroup.Item className="timeSlot altColor" />
        }
      })}
      {/* <Lesson /> */}
      
      {currentPlan.map(mod => {
        return (
          <>
            {mod.index.lessons.map(lesson => {
              if (lesson.day === day.toUpperCase()) {
                console.log(lesson)
                return (
                  <Lesson 
                    width={calculateLessonWidth(lesson.startTime, lesson.endTime)}
                    offset={calculateLessonOffset(lesson.startTime)}
                    courseCode={mod.courseCode}
                    type={lesson.type}
                    group={lesson.group}
                    venue={lesson.venue}
                    teachingWeeks={lesson.teachingWeeks}
                  />
                )
              }
            })}
          </>
        )
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
          <ListGroup.Item className="timeSlot timeCell border-0 text-center">
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