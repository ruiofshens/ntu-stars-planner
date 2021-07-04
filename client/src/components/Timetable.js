import React, { useContext, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import { CurrentPlanContext } from '../contexts/CurrentPlanContext';

import Lesson from '../components/Lesson';

//TODO:  reduce code repetition
function Timetable() {

  /* currentPlan -> Plan to be displayed by the Timetable component  */
  const { currentPlan } = useContext(CurrentPlanContext);

  return (
      <Container fluid className="timetable">
      <Row className="px-5">
        <time className="col-sm">08:00</time>
        <time className="col-sm">09:00</time>
        <time className="col-sm">10:00</time>
        <time className="col-sm">11:00</time>
        <time className="col-sm">12:00</time>
        <time className="col-sm">13:00</time>
        <time className="col-sm">14:00</time>
        <time className="col-sm">15:00</time>
        <time className="col-sm">16:00</time>
        <time className="col-sm">17:00</time>
        <time className="col-sm">18:00</time>
        <time className="col-sm">19:00</time>
        <time className="col-sm">20:00</time>
        <time className="col-sm">21:00</time>
        <time className="col-sm">22:00</time>
      </Row>
      <TimetableRow day = "Mon"/>
      <TimetableRow day = "Tue"/>
      <TimetableRow day = "Wed"/>
      <TimetableRow day = "Thu"/>
      <TimetableRow day = "Fri"/>
      <TimetableRow day = "Sat"/>
      </Container>
  );
}

// Contains the cells for each day as a row, excluding the day itself
function TimetableRow(props) {

  const { currentPlan } = useContext(CurrentPlanContext);

  function generateWidth(startTime, endTime){
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    //End times are brought forward by 10 mins, so need to add back 10 * 60 * 1000 seconds
    //Divide by 1000 * 60 * 60 to convert ms to hrs
    const noOfHours = (end + 600000 - start) / 3600000;
    return (noOfHours * 6.5).toString() + "rem";
  }

  function generateOffset(startTime){
    const start = new Date(startTime).getTime();

    const min = Math.ceil(1);
    const max = Math.floor(11);
    return (((Math.floor(Math.random() * (max - min + 1)) + min) * 6) + 6).toString() + "rem";

    //Need to calculate offset from earliest time in timetable
    //return ((Math.random() * (11.5 - 0.5) + 0.5) * 6.5).toString() + "%";
  }

  return (
    <ListGroup horizontal className="timetableRow">
      <ListGroup.Item className="dayCell px-0"></ListGroup.Item>
      <ListGroup.Item className="flex-fill" />
      <ListGroup.Item className="altColor flex-fill"/>
      <ListGroup.Item className="flex-fill"/>
      <ListGroup.Item className="altColor flex-fill"/>
      <ListGroup.Item className="flex-fill"/>
      <ListGroup.Item className="altColor flex-fill"/>
      <ListGroup.Item className="flex-fill"/>
      <ListGroup.Item className="altColor flex-fill"/>
      <ListGroup.Item className="flex-fill"/>
      <ListGroup.Item className="altColor flex-fill"/>
      <ListGroup.Item className="flex-fill"/>
      <ListGroup.Item className="altColor flex-fill"/>
      <ListGroup.Item className="flex-fill"/>
      <ListGroup.Item className="altColor flex-fill"/>
      <ListGroup.Item className="flex-fill"/>
      {
      currentPlan.map(module => {
        return (
          <>
            {
              module.index.lessons.map(lesson => {
                return(
                  <Lesson
                    courseCode = {module.courseCode}
                    type = {lesson.type}
                    group = {lesson.group}
                    venue = {lesson.venue}
                    teachingWeeks = {lesson.teachingWeeks}
                    //marginLeft = "6rem"
                    // width = "26%"
                    marginLeft = {generateOffset(lesson.startTime)}
                    width = {generateWidth(lesson.startTime, lesson.endTime)}
                  />
                )
              })
            }
          </>
        )
      })
    }
    </ListGroup>
  );
}

export default Timetable;