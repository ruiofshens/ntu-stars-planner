import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import Timetable from '../components/Timetable';
import CourseOverview from '../components/CourseOverview';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function TimetablePage() {
  return (
    <Container fluid className="px-4">
      <Timetable/>
      <hr/>
      <Row>
        <Col xs={10}>
        <Row className="px-3">
          <h5 className="align-text">Courses Overview</h5>
            <Button variant="outline-primary mx-2 my-1" size="sm">{'<'}</Button>
            <h6 className="font-italic align-text">Plan 1 of 64</h6>
            <Button variant="outline-primary mx-2 my-1" size="sm">{'>'}</Button>
            </Row>
          <CourseOverview/>
          
        </Col>
        <Col xs={2}>
        <DropdownButton id="dropdown-basic-button" title="Plan #">
          <Dropdown.Item href="#/plan-1">Plan 1</Dropdown.Item>
          <Dropdown.Item href="#/plan-2">Plan 2</Dropdown.Item>
          <Dropdown.Item href="#/plan-3">Plan 3</Dropdown.Item>
        </DropdownButton>
          <Button variant="outline-primary my-3">Save Current Plan</Button>
          <LinkContainer to="/courses">
            <Button variant="outline-primary">Reselect Modules</Button>
          </LinkContainer>
        </Col>
      </Row>
    </Container>
  );
}

export default TimetablePage;