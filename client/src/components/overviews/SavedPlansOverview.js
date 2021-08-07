import React, { useContext, useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import PlanDetails from '../PlanDetails';
import { SavedPlansContext } from '../../contexts/SavedPlansContext';
import { CurrentPlanContext } from '../../contexts/CurrentPlanContext';
import { CoursesContext } from '../../contexts/CoursesContext';

function SavedPlansOverview() {

    const { savedPlans, setSavedPlans } = useContext(SavedPlansContext);
    const { setCurrentPlan } = useContext(CurrentPlanContext);
    
    const { courses } = useContext(CoursesContext); // for checking if courses are loaded in already
    const [ chosenPlan, setChosenPlan ] = useState("-1");

    //Render saved plan only if it has been defined already and update current index
    const renderPlan = (value) => {
        if (courses.length === 0) { // courses not loaded in yet, cannot load saved plan
            alert("Loading in courses... Please try a few seconds later.");
            return;
        }
        if (savedPlans.plans[value]){
            setSavedPlans({...savedPlans, currentIndex: value})
            setCurrentPlan(savedPlans.plans[value]);
            setChosenPlan(value);
        }
        else if (value === "-1") {
            setChosenPlan(value);
        } else {
            alert("Plan not defined yet!");
        }
    }

    return (
        <Row>
            <Col xs={12} lg={1} className="d-flex flex-column align-items-center">
            Load Plan:
                <Row className="px-1 pb-4 my-1 align-items-center">
                    <Form.Control 
                    size="sm" 
                    as="select" 
                    value={chosenPlan}
                    onChange={choice => renderPlan(choice.target.value)}>
                        <option value = {-1}>Choose Plan</option>
                        <option value = {0}>Plan 1</option>
                        <option value = {1}>Plan 2</option>
                        <option value = {2}>Plan 3</option>
                    </Form.Control>
                </Row>
            </Col>
            <Col xs={12} lg={11}>
                <PlanDetails/>
            </Col>
        </Row>
    );
}
  
export default SavedPlansOverview;