import React, { useContext } from 'react';

import { Container } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

import { CurrentPlanContext } from '../contexts/CurrentPlanContext';

import Lesson from './Lesson';
import OverlappedLessons from './OverlappedLessons';

//https://flatuicolors.com/palette/tr
const COLORS = [
  "#17c0eb", //Spiro Disco Ball
  "#cd84f1", //Bright Lilac
  "#ffaf40", //Mandarin Sorbet
  "#3ae374", //Weird Green
  "#67e6dc", //Hammam Blue
  "#ffb8b8", //Young Salmon
  "#ff4d4d", //Light Red
]

function Timetable() {
  const { currentPlan } = useContext(CurrentPlanContext);
  const allLessons = {
    MON: [],
    TUE: [],
    WED: [],
    THU: [],
    FRI: [],
    SAT: [],
  };
  currentPlan.forEach((mod, i) => mod.index.lessons.forEach(lesson => {
    lesson.courseCode = mod.courseCode;
    lesson.color = COLORS[i];
    allLessons[lesson.day].push(lesson);
  }));
  // identify all overlapping lessons
  Object.values(allLessons).forEach(lessons => {
    for (let i=0; i<lessons.length-1; i++) {
      let overlapped = [];
      for (let j=i+1; j<lessons.length; j++) {
        if (lessons[i].startTime < lessons[j].endTime && lessons[i].endTime > lessons[j].startTime) {
          overlapped.push(lessons[j]);
          lessons.splice(j, 1);
        }
      }
      if (overlapped.length !== 0) {
        overlapped.push(lessons[i]);
        lessons.splice(i, 1);
        i--;
        lessons.push(overlapped);
      }
    }
  });

  return (
      <Container fluid style={{padding: "0 1.5vw"}}>
        <TimeRow />
        <TimetableRow day="Mon" lessons={allLessons.MON}/>
        <TimetableRow day="Tue" lessons={allLessons.TUE}/>
        <TimetableRow day="Wed" lessons={allLessons.WED}/>
        <TimetableRow day="Thu" lessons={allLessons.THU}/>
        <TimetableRow day="Fri" lessons={allLessons.FRI}/>
        <TimetableRow day="Sat" lessons={allLessons.SAT}/>
      </Container>
  );
}

// Contains the cells for each day as a row, excluding the day itself
function TimetableRow({ day, lessons }) {
  // const { currentPlan } = useContext(CurrentPlanContext);
  // const lessonsArray = [];
  let maxOverlapped = 0;
  lessons.forEach(lesson => {
    if (lesson instanceof Array && lesson.length > maxOverlapped) {
      maxOverlapped = lesson.length;
    }
  });

  // each time slot is 6.2vw, i.e. 60min == 6.2vw ==> 1min = 8/75vw
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
    <ListGroup horizontal className="position-relative">
      {lessons.map(lesson => {
        if (!(lesson instanceof Array)) {
          const width = calculateLessonWidth(lesson.startTime, lesson.endTime);
          const offset = calculateLessonOffset(lesson.startTime);
          return (
            <Lesson
              position={"absolute"}
              width={width}
              offset={offset}
              color={lesson.color}
              courseCode={lesson.courseCode}
              type={lesson.type}
              group={lesson.group}
              venue={lesson.venue}
              teachingWeeks={lesson.teachingWeeks}
            />
          )
        } else {
          return (
            <OverlappedLessons
              lessons={lesson}
              calculateLessonWidth={calculateLessonWidth}
              calculateLessonOffset={calculateLessonOffset}
            />
          )
        }
      })}

      <ListGroup.Item 
        className="dayCell timetableRow" 
        style={ maxOverlapped > 1 ? {height: `${maxOverlapped*12}vh`} : {}}
      >
        {day}
      </ListGroup.Item>
      {Array(15).fill().map((e, i) => {
        if (i%2 === 0) {
          return <ListGroup.Item key={i} className="timeSlot" />
        } else {
          return <ListGroup.Item key={i} className="timeSlot altColor" />
        }
      })}
      {/* <Lesson /> */}
      
      {/* {currentPlan.map((mod,index) => {
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
                    height={overlapStyle.height}
                    offset={lessonOffset}
                    verticalOffset={overlapStyle.verticalOffset}
                    color={colorArray[index]}
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
      })} */}
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
