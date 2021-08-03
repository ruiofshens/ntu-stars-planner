import React, { useContext } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { CurrentPlanContext } from '../contexts/CurrentPlanContext';
import { SavedPlansContext } from '../contexts/SavedPlansContext';

import PlanDetails from './PlanDetails';


function CourseOverview() {

  /* currentPlan -> to check if currentPlan has been defined already and also for saving
  savedPlans ->  to clone array of saved plans, used while saving currently active plan
  setSavedPlans -> to update array of saved plans */
  const { currentPlan } = useContext(CurrentPlanContext);
  const { savedPlans, setSavedPlans } = useContext(SavedPlansContext);

  //Save the currently active generated timetable to the selected plan
  //First check if currentPlan is already defined
  const saveToPlan = (value) => {
    if (value !== "-1" && currentPlan.length !== 0) {
      let tempSavedPlans = savedPlans;
      tempSavedPlans.plans[value] = [...currentPlan];
      setSavedPlans({...tempSavedPlans, currentIndex: tempSavedPlans.currentIndex});
      alert(`Saved to Plan ${+value+1}!`); //Unary plus operator converts value to number in string literal
    }
  }

  return (
    <Row>
      <Col xs={2}>
        <Row className="px-1 my-1 align-items-center">
          <Form.Control size="sm" as="select" onChange={choice => saveToPlan(choice.target.value)}>
              <option value = {-1}>Save to Plan!</option>
              <option value = {0}>Save to Plan 1</option>
              <option value = {1}>Save to Plan 2</option>
              <option value = {2}>Save to Plan 3</option>
          </Form.Control>
        </Row>
      </Col>
      <Col xs={10}>
        <PlanDetails/>
      </Col>
    </Row>
  );
}
  
export default CourseOverview;