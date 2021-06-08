import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import CourseInputGroup from '../components/CourseInputGroup'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CourseSelectionPage() {
  return (
    
    <Row className="px-3">
      <Col xs={3}>
        <h5>Select Course Codes</h5>
        <hr/>
        <CourseInputGroup/>

        <Form>
          <Form.Check
            type="checkbox"
            id={`includeVacancy`}
            label={`Consider Vacancies`}
          />
        </Form>

        <hr/>
        
        <LinkContainer to="/">
          <Button variant="outline-primary m-1">Plan Timetable</Button>
        </LinkContainer>
        <Button variant="outline-primary m-1">Undo All</Button>
      </Col>
      <Col xs={9}>
      <h2>The courses retrieved should be inserted here!</h2>
        <hr/>
        <hr/>
        <Button variant="outline-primary">Retrieve Courses</Button>
      </Col>
    </Row>
  );
}

export default CourseSelectionPage;