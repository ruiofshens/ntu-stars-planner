import React, { useContext } from 'react';

import ListGroup from 'react-bootstrap/ListGroup';

import { CurrentPlanContext } from '../../contexts/CurrentPlanContext';
import { CustomisationContext } from '../../contexts/CustomisationContext';

import Lesson from './Lesson';
import OverlappedLessons from './OverlappedLessons';


const COLORS = [
  //https://flatuicolors.com/palette/tr
  "#17c0eb", //Spiro Disco Ball
  "#cd84f1", //Bright Lilac
  "#ffaf40", //Mandarin Sorbet
  "#3ae374", //Weird Green
  "#7efff5", //Electric Blue
  "#ffb8b8", //Young Salmon
  "#ff4d4d", //Light Red

  //https://flatuicolors.com/palette/es
  "#706fd3", //C64 Purple
  "#ccae62", //Desert
  "#ff793f", //Synthetic Pumpkin

  //https://flatuicolors.com/palette/defo
  "#16a085", //Green Sea
  "#8e44ad", //Wisteria
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
    if (allLessons[lesson.day]) // online courses like 1AU ones have no actual lessons
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
      <>
        <TimeRow />
        <TimetableRow day="Mon" lessons={allLessons.MON}/>
        <TimetableRow day="Tue" lessons={allLessons.TUE}/>
        <TimetableRow day="Wed" lessons={allLessons.WED}/>
        <TimetableRow day="Thu" lessons={allLessons.THU}/>
        <TimetableRow day="Fri" lessons={allLessons.FRI}/>
        <TimetableRow day="Sat" lessons={allLessons.SAT}/>
      </>
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

    // Media query
    if (window.matchMedia( "(max-width: 575.98px)" ).matches) {
      // For window widths of less than 575.98px (phones)
      return (lessonDuration * ratio * 3) + "vw";
    } else if (window.matchMedia( "(max-width: 991.98px)" ).matches) {
      // For medium devices (tablets, less than 992px)
      return (lessonDuration * ratio * 2) + "vw";
    } else {
      // For window width greater than 575.98px (computer screens)
      return (lessonDuration * ratio ) + "vw";
    }
  }

  const calculateLessonOffset = (startTime) => {
    startTime = new Date(startTime);

    // day text takes up 4vw
    const startingHour = new Date("January 1 2021 8:00"); // 8am
    let offsetInMin = (startTime - startingHour) / (1000*60);

    // Media query
    if (window.matchMedia( "(max-width: 575.98px)" ).matches) {
      // For window widths of less than 575.98px (phones)
      return ((offsetInMin * ratio * 3) + 12) + "vw";
    } else if (window.matchMedia( "(max-width: 991.98px)" ).matches) {
      // For medium devices (tablets, less than 992px)
      return ((offsetInMin * ratio * 2) + 8) + "vw";
    } else {
      // For window width greater than 575.98px (computer screens)
      return ((offsetInMin * ratio) + 4) + "vw";
    }
  }
  
  return (
    <ListGroup horizontal className="position-relative timetableRow">
      {lessons.map((lesson, number) => {
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
              key={number}
            />
          )
        } else {
          return (
            <OverlappedLessons
              lessons={lesson}
              calculateLessonWidth={calculateLessonWidth}
              calculateLessonOffset={calculateLessonOffset}
              key={number}
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
      <ListGroup horizontal className="timeRow mt-2">
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
