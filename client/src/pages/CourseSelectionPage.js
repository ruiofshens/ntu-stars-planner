import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import CourseInputGroup from '../components/CourseInputGroup';
import CourseDatabase from '../components/CourseDatabase';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CourseSelectionPage() {
  return (
    
    <Container fluid className="px-4">
      <Row>
        <Col xs={3}>
        <h5 className="text-center">Select Course Codes</h5>
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
        <Col xs={9} className="d-flex flex-column align-items-center">
        <CourseDatabase/>
        <hr/>
        <Form className="d-flex" style={{width: "35%"}}>
          <Form.Control placeholder="Enter course code/name"/>
          <Button variant="outline-primary">Search</Button>
        </Form>
      </Col>
      </Row>
    </Container>
  );
}

export default CourseSelectionPage;