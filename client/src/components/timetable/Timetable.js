import React, { useContext } from 'react';

import { Container } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

import { CurrentPlanContext } from '../../contexts/CurrentPlanContext';
import { CustomisationContext } from '../../contexts/CustomisationContext';

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
      let curr = lessons[i];
      for (let j=i+1; j<lessons.length; j++) {
        let next = lessons[j];
        if (curr.startTime < next.endTime && curr.endTime > next.startTime) {
          overlapped.push(next);
          lessons.splice(j, 1);
          j--;
        }
      }
      if (overlapped.length !== 0) {
        overlapped.push(curr);
        lessons.splice(i, 1);
        i--;
        lessons.push(overlapped);
      }
    }
  });

  return (
      <Container fluid style={{padding: "0 1.5vw"}} className="timetableContainer">
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

  const { customOptions } = useContext(CustomisationContext);

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

    //Media query
    var mq = window.matchMedia( "(max-width: 575.98px)" );
    if (mq.matches) {
        // window width is at less than 575.98px (phones)
        return (lessonDuration * ratio * 3) + "vw";
    }
    else {
        // window width is greater than 575.98px (computers)
        return (lessonDuration * ratio ) + "vw";
    }
  }

  const calculateLessonOffset = (startTime) => {
    startTime = new Date(startTime);

    // day text takes up 4vw
    const startingHour = new Date("January 1 2021 8:00"); // 8am
    let offsetInMin = (startTime - startingHour) / (1000*60);

    //Media query
    var mq = window.matchMedia( "(max-width: 575.98px)" );
    if (mq.matches) {
        // window width is at less than 575.98px (phones)
        return ((offsetInMin * ratio * 3) + 12) + "vw";
    }
    else {
        // window width is greater than 575.98px (computers)
        return ((offsetInMin * ratio) + 4) + "vw";
    }
  }
  
  return (
    <ListGroup horizontal className="position-relative timetableRow">
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
        className="dayCell" 
        style={ maxOverlapped > 1 ? {height: `${maxOverlapped*12}vh`} : {}}
      >
        {day}
      </ListGroup.Item>
      {Array(15).fill().map((e, i) => {
        if (i%2 === 0) {
          return <ListGroup.Item key={i} 
          className={customOptions.displaySetting === "lightMode" ? "timeSlot" : "timeSlot darkModeCell"} />
        } else {
          return <ListGroup.Item key={i} 
          className={customOptions.displaySetting === "lightMode" ? "timeSlot altColor" : "timeSlot darkModeAltCell"} />
        }
      })}
    </ListGroup>
  );
}

function TimeRow() {
  const { customOptions } = useContext(CustomisationContext);

  return (
    <>
      <ListGroup horizontal className="timeRow timetableRow">
        <ListGroup.Item className={`dayCell border-0 ${customOptions.displaySetting}`}></ListGroup.Item>
        {Array(15).fill("").map((e, i) => (
          <ListGroup.Item key={i} className={`timeSlot timeCell border-0 px-0 text-center ${customOptions.displaySetting}`}>
            <time>{i+8 < 10 ? "0"+(i+8) : i+8}:00</time>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default Timetable;
