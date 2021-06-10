import React from 'react';

import Timetable from '../components/Timetable';
import CourseOverview from '../components/CourseOverview';
import IndexEditOverview from '../components/IndexEditOverview';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function TimetablePage() {
  return (
    <Container fluid className="px-4">
      <Timetable/>
      <Container fluid className ="pt-2">
          <Tabs defaultActiveKey="choose-plan" id="toggle-course-overview" className="mb-3">
            <Tab eventKey="choose-plan" title="Step 1: Choose Plan">
              <Row>
                <Col xs={2}>
                  <Row className="px-3 my-1">
                    <Button variant="outline-primary mx-2 my-1" size="sm">{'<'}</Button>
                    <h6 className="font-italic align-text">Plan 1 of 64</h6>
                    <Button variant="outline-primary mx-2 my-1" size="sm">{'>'}</Button>
                  </Row>
                </Col>
                <Col xs={10}>
                  <CourseOverview/>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="edit-plan" title="Step 2: Edit Plan">
              <IndexEditOverview/>
            </Tab>
            <Tab eventKey="save-plan" title="Step 3: Save Plan">
              <Row>
                <Button variant="outline-primary mr-2">Save to Selected Plan</Button>
                <Form.Control size="sm" as="select" style={{width: "15%"}}>
                  <option>Plan 1</option>
                  <option>Plan 2</option>
                  <option>Plan 3</option>
                </Form.Control>
                <Button variant="outline-primary ml-5">Print Timetable</Button>
              </Row>
            </Tab>
          </Tabs>
      </Container>
    </Container>
  );
}

export default TimetablePage;