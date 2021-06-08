import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Timetable from '../components/Timetable';
import CourseOverview from '../components/CourseOverview';

function HomePage() {
  return (
    <Container fluid className="px-4">
        <Timetable/>
      <hr/>
      <Row>
        <Col xs={10}>
          <h5>Courses Overview</h5>
          <CourseOverview/>
        </Col>
        <Col xs={2}>
          <LinkContainer to="/courses">
            <Button variant="outline-primary">Reselect Modules</Button>
          </LinkContainer>
          <hr/>
          <Button variant="outline-primary">Download Timetable</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;