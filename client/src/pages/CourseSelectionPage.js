import React, { useContext, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Accordion from 'react-bootstrap/Accordion';
import Alert from 'react-bootstrap/Alert';

import CourseInputGroup from '../components/CourseInputGroup';
import CourseDatabase from '../components/CourseDatabase';
import FreeTimes from '../components/FreeTimes';
import UseIndexes from '../components/UseIndexes';
import MiscConstraints from '../components/MiscConstraints';

import TimetablesGenerator from '../services/timetables/timetablesGenerator';

import { TimetablePlansContext } from '../contexts/TimetablePlansContext';
import { SelectedCoursesContext } from '../contexts/SelectedCoursesContext';
import { CurrentPlanContext } from '../contexts/CurrentPlanContext';
import { ConstraintsContext } from '../contexts/ConstraintsContext';

function CourseSelectionPage() {

  /* selectedCourses -> List of selected courses by user to generate timetable plans  
  setTimetablePlans -> For Button to call and generate timetables based on selectedCourses
  setCurrentPlan -> Intialise first timetable plan as current plan  */
  const { selectedCourses } = useContext(SelectedCoursesContext);
  const { setTimetablePlans } = useContext(TimetablePlansContext);
  const { setCurrentPlan } = useContext(CurrentPlanContext);
  const { chosenIndexes, freeTimes, miscConstraints } = useContext(ConstraintsContext);
  const [canGenerate, setCanGenerate] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ header: null, details: null }); // for displaying why timetable could not be generated
  const [showError, setShowError] = useState(false);

  const history = useHistory();

  async function retrieveTimetablePlans() {
    let generated = await TimetablesGenerator.generateAll(selectedCourses, chosenIndexes, freeTimes, miscConstraints);
    if (generated.canGenerate && generated.timetables.length !== 0) {
      setCanGenerate(true);
      setTimetablePlans({timetables: generated.timetables, currentIndex: 0});
      setCurrentPlan(generated.timetables[0]);
      history.push('/')
    } else {
      setCanGenerate(false);
      setShowError(true);
      if (generated.clashed) { // exam clash
        let clashed = "";
        generated.clashed.forEach(exam => {
          let examStart = new Date(exam.examDate).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false});
          let examEnd = new Date(exam.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
          clashed += `${exam.courseCode}\t${examStart} - ${examEnd}\n`;
        })
        setErrorMessage({
          header: `${generated.clashed.length} courses have clashing examination timings:`,
          details: clashed,
        })
      } else if (generated.timetables.length === 0) { 
        setErrorMessage({
          header: "No non-clashing timetables can be generated with the given specifications.",
          details: null,
        })
      }
    }
  }

  return (
    <Container fluid className="px-4">
      {!canGenerate && showError && 
        <Row>
          <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
            <span>{errorMessage.header}</span>
            {errorMessage.details &&
              <>
                <hr />
                <span style={{whiteSpace: "pre-wrap"}}>{errorMessage.details}</span>
              </>
            }
          </Alert>
        </Row>
      }
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
          
          <Button 
            variant="outline-primary m-1"
            onClick={() => retrieveTimetablePlans()}>
            Plan Timetable
          </Button>
          <Button variant="outline-primary m-1">Undo All</Button>
        </Col>
        <Col xs={9} className="d-flex flex-column align-items-center">
          <CourseDatabase/>
        </Col>
      </Row>

      <Row className="mt-4 mb-2">
        <Accordion defaultActiveKey="advanced-settings">
          <Accordion.Item eventKey="advanced-settings">
            <Accordion.Header><strong>Advanced Settings</strong></Accordion.Header>
            <Accordion.Body>
              <Tabs defaultActiveKey="use-indexes" id="adjust-rules" className="mb-3">
                <Tab eventKey="use-indexes" title="Use Indexes">
                  <UseIndexes />
                </Tab>
                <Tab eventKey="free-times" title="Free Times">
                  <FreeTimes />
                </Tab>
                <Tab eventKey="misc-constraints" title="Misc.">
                  <MiscConstraints />
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