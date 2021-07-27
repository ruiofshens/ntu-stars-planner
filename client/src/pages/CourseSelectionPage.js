import React, { useContext, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Accordion from 'react-bootstrap/Accordion';

import CourseInputGroup from '../components/CourseInputGroup';
import CourseDatabase from '../components/CourseDatabase';
import FreeTimes from '../components/FreeTimes';
import UseIndexes from '../components/UseIndexes';
import MiscConstraints from '../components/MiscConstraints';

import TimetablesGenerator from '../services/timetables/timetablesGenerator';

import { TimetablePlansContext } from '../contexts/TimetablePlansContext';
import { SelectedCoursesContext } from '../contexts/SelectedCoursesContext';
import { CurrentPlanContext } from '../contexts/CurrentPlanContext';

function CourseSelectionPage() {

  /* selectedCourses -> List of selected courses by user to generate timetable plans  
  setTimetablePlans -> For Button to call and generate timetables based on selectedCourses
  setCurrentPlan -> Intialise first timetable plan as current plan  */
  const { selectedCourses } = useContext(SelectedCoursesContext);
  const { setTimetablePlans } = useContext(TimetablePlansContext);
  const { setCurrentPlan } = useContext(CurrentPlanContext);

  // states for advanced settings
  const [chosenIndexes, setChosenIndexes] = useState({});
  const [freeTimes, setFreeTimes] = useState([]);
  const [miscConstraints, setMiscConstraints] = useState({
    noBackToBack: false,
    avoidLunchHours: false,
  });

  async function retrieveTimetablePlans() {
    let { timetables } = await TimetablesGenerator.generateAll(selectedCourses, chosenIndexes, freeTimes, miscConstraints);
    setTimetablePlans({timetables: timetables, currentIndex: 0});
    setCurrentPlan(timetables[0]);
  }

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
            <Button 
              variant="outline-primary m-1"
              onClick={() => retrieveTimetablePlans()}>
              Plan Timetable
            </Button>
          </LinkContainer>
          <Button variant="outline-primary m-1">Undo All</Button>
        </Col>
        <Col xs={9} className="d-flex flex-column align-items-center">
          <CourseDatabase/>
        </Col>
      </Row>

      <Row className="mt-4 mb-2">
        <Accordion>
          <Accordion.Item eventKey="advanced-settings">
            <Accordion.Header><strong>Advanced Settings</strong></Accordion.Header>
            <Accordion.Body>
              <Tabs defaultActiveKey="use-indexes" id="adjust-rules" className="mb-3">
                <Tab eventKey="use-indexes" title="Use Indexes">
                  <UseIndexes 
                    chosenIndexes={chosenIndexes}
                    setChosenIndexes={setChosenIndexes}
                  />
                </Tab>
                <Tab eventKey="free-times" title="Free Times">
                  <FreeTimes 
                    freeTimes={freeTimes}
                    setFreeTimes={setFreeTimes}
                  />
                </Tab>
                <Tab eventKey="misc-constraints" title="Misc.">
                  <MiscConstraints 
                    miscConstraints={miscConstraints}
                    setMiscConstraints={setMiscConstraints}
                  />
                </Tab>
              </Tabs>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
    </Container>
  );
}

export default CourseSelectionPage;