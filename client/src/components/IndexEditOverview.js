import React, { useContext } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import PlanDetails from './PlanDetails';
import TimetablePlanConstraints from './TimetablePlanConstraints';

import TimetablesGenerator from '../services/timetables/timetablesGenerator';

import { TimetablePlansContext } from '../contexts/TimetablePlansContext';
import { SelectedCoursesContext } from '../contexts/SelectedCoursesContext';
import { CurrentPlanContext } from '../contexts/CurrentPlanContext';
import { ConstraintsContext } from '../contexts/ConstraintsContext';

function IndexEditOverview() {

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
      <>
        <Row>
          <Col xs={2}>
            <Button 
              variant="outline-primary my-1" 
              size="sm"
              onClick={() => retrieveTimetablePlans()}>
              {'Replan Timetable'}
            </Button>
          </Col>
          <Col xs={10}>
            <PlanDetails/>
          </Col> 
        </Row>
        <Row>
          <TimetablePlanConstraints />
        </Row>
      </>
    );
  }
  
  export default IndexEditOverview;