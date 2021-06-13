import React, { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';

import { CurrentPlanContext } from '../contexts/CurrentPlanContext';

import Lesson from '../components/Lesson';

//TODO:  reduce code repetition
function Timetable() {

  /* currentPlan -> Plan to be displayed by the Timetable component  */
  const { currentPlan } = useContext(CurrentPlanContext);

  return (
      <Container fluid>
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
      <ListGroup horizontal className="timetableRow">
        <ListGroup.Item className="dayCell px-2">Mon</ListGroup.Item>
        <TimetableRow/>
      </ListGroup>
      <ListGroup horizontal className="timetableRow">
        <ListGroup.Item className="dayCell px-2">Tue</ListGroup.Item>
        <TimetableRow/>
      </ListGroup>
      <ListGroup horizontal className="timetableRow">
        <ListGroup.Item className="dayCell px-2">Wed</ListGroup.Item>
        <TimetableRow/>
      </ListGroup>
      <ListGroup horizontal className="timetableRow">
        <ListGroup.Item className="dayCell px-2">Thu</ListGroup.Item>
        <TimetableRow/>
      </ListGroup>
      <ListGroup horizontal className="timetableRow">
        <ListGroup.Item className="dayCell px-2">Fri</ListGroup.Item>
        <TimetableRow/>
      </ListGroup>
      <ListGroup horizontal className="timetableRow">
        <ListGroup.Item className="dayCell px-2">Sat</ListGroup.Item>
        <TimetableRow/>
      </ListGroup>
      </Container>
  );
}

// Contains the cells for each day as a row, excluding the day itself
function TimetableRow() {
  return (
    <>
      <ListGroup.Item className="flex-fill">
        <Lesson/>
      </ListGroup.Item>
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
    </>
  );
}

export default Timetable;