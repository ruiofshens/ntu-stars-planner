import React, { useContext } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { TimetablePlansContext } from '../contexts/TimetablePlansContext';
import { CurrentPlanContext } from '../contexts/CurrentPlanContext';
import PlanDetails from './PlanDetails';


function CourseOverview() {

  /* timetablePlans -> to have access to all the plans for toggling between them
  setCurrentPlan -> to change the active plan when user choose the previous/next plan 
  setTimetablePlans -> to update currently active plan */
  const { timetablePlans, setTimetablePlans } = useContext(TimetablePlansContext);
  const { currentPlan, setCurrentPlan } = useContext(CurrentPlanContext);

  const decreasePlanIndex = () => {
    if ( timetablePlans.length !== 0 && timetablePlans.currentIndex !== 0){
      setCurrentPlan(timetablePlans.timetables[timetablePlans.currentIndex - 1]);
      setTimetablePlans({...timetablePlans, currentIndex: timetablePlans.currentIndex - 1});
    }
  }

  const increasePlanIndex = () => {
    if (timetablePlans.length !== 0 && timetablePlans.currentIndex !== (timetablePlans.timetables.length - 1)){
      setCurrentPlan(timetablePlans.timetables[timetablePlans.currentIndex + 1]);
      setTimetablePlans({...timetablePlans, currentIndex: timetablePlans.currentIndex + 1});
    }
  }

  return (
    <Row>
      <Col xs={2}>
        <Row className="px-1 my-1">
          <Col xs={3}>
            <Button 
              variant="outline-primary my-1" 
              size="sm"
              onClick={decreasePlanIndex}>
              {'<'}
            </Button>
          </Col>
          <Col xs={6} className="font-italic align-text">
              {(Object.entries(timetablePlans).length === 0) ? "Select Courses" : 
              `Plan ${timetablePlans.currentIndex + 1} of ${timetablePlans.timetables.length}`}
          </Col>
          <Col xs={3}>
            <Button 
              variant="outline-primary my-1" 
              size="sm"
              onClick={increasePlanIndex}>
              {'>'}
            </Button>
          </Col>
        </Row>
      </Col>
      <Col xs={10}>
        <PlanDetails/>
      </Col>
    </Row>
  );
}
  
export default CourseOverview;