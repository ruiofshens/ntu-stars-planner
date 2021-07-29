import React, { useContext } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import CourseInputGroup from '../components/CourseInputGroup';
import CourseDatabase from '../components/CourseDatabase';
import TimetablePlanConstraints from '../components/TimetablePlanConstraints';

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

  async function retrieveTimetablePlans() {
    let { timetables } = await TimetablesGenerator.generateAll(selectedCourses, chosenIndexes, freeTimes, miscConstraints);
    setTimetablePlans({timetables: timetables, currentIndex: 0});
    setCurrentPlan(timetables[0]);
  }

  return (
    <Container fluid className="px-4 pt-3">
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
        <TimetablePlanConstraints />
      </Row>
    </Container>
  );
}

export default CourseSelectionPage;