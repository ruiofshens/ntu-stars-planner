import React, { useContext } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import PlanDetails from './PlanDetails';
import { SavedPlansContext } from '../contexts/SavedPlansContext';
import { CurrentPlanContext } from '../contexts/CurrentPlanContext';

function SavedPlansOverview() {

    /* savedPlans -> to have access to array of saved plans
    setSavedPlan -> to update currently active plan in array of saved plans
    setCurrentPlan -> to update the plan to be displayed to user */
    const { savedPlans, setSavedPlans } = useContext(SavedPlansContext);
    const { setCurrentPlan } = useContext(CurrentPlanContext);

    //Render saved plan only if it has been defined already and update current index
    const renderPlan = (value) => {
        if (savedPlans.plans[value]){
            setSavedPlans({...savedPlans, currentIndex: value})
            setCurrentPlan(savedPlans.plans[value]);
        }
        else
            alert("Plan not defined yet!");
    }

    return (
        <Row>
            <Col xs={2}>
                <Form.Control 
                size="sm" 
                as="select" 
                value={savedPlans.currentIndex}
                onChange={choice => renderPlan(choice.target.value)}>
                    <option value = {0}>Plan 1</option>
                    <option value = {1}>Plan 2</option>
                    <option value = {2}>Plan 3</option>
                </Form.Control>
            </Col>
            <Col xs={10}>
                <PlanDetails/>
            </Col>
        </Row>
    );
}
  
export default SavedPlansOverview;