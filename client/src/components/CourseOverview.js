import React, { useState, useContext } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { TimetablePlansContext } from '../contexts/TimetablePlansContext';
import { CurrentPlanContext } from '../contexts/CurrentPlanContext';
import { SavedPlansContext } from '../contexts/SavedPlansContext';
import PlanDetails from './PlanDetails';


function CourseOverview() {

  /* timetablePlans -> to have access to all the plans for toggling between them
  setCurrentPlan -> to change the active plan when user choose the previous/next plan 
  setTimetablePlans -> to update currently active plan
  setSavedPlans -> to save currently active plan */
  const { timetablePlans, setTimetablePlans } = useContext(TimetablePlansContext);
  const { setCurrentPlan } = useContext(CurrentPlanContext);
  const { setSavedPlans } = useContext(SavedPlansContext);

  const [ planToSave, setPlanToSave ] = useState(1);

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

  const saveToPlan = () => {
    
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
              `Plan ${timetablePlans.currentIndex + 1}/${timetablePlans.timetables.length}`}
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
        <Row className="px-1 my-1 align-items-center">
        <Col xs={7}>
          <Button 
              variant="outline-primary my-1" 
              size="sm"
              onClick={saveToPlan}>
              {'Save To:'}
          </Button>
          </Col>
          <Col xs={5}>
          <Form.Control size="sm" as="select" onChange={choice => setPlanToSave(choice.target.value)}>
              <option value = {1}>Plan 1</option>
              <option value = {2}>Plan 2</option>
              <option value = {3}>Plan 3</option>
          </Form.Control>
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