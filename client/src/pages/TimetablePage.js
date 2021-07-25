import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Timetable from '../components/Timetable';
import CourseOverview from '../components/CourseOverview';
import IndexEditOverview from '../components/IndexEditOverview';


function TimetablePage() {

  return (
    <Container fluid className="px-0">
      <Timetable/>
      <Container fluid className ="pt-2">
          <Tabs defaultActiveKey="choose-plan" id="toggle-course-overview" className="mb-3">
            <Tab eventKey="choose-plan" title="Choose Plan">
              <CourseOverview/>
            </Tab>
            <Tab eventKey="edit-plan" title="Edit Plan">
              <IndexEditOverview/>
            </Tab>
            <Tab eventKey="save-plan" title="Save Plan">
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