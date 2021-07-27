import React, { useContext } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import PlanDetails from './PlanDetails';
import { SavedPlansContext } from '../contexts/SavedPlansContext';
import { CurrentPlanContext } from '../contexts/CurrentPlanContext';

function SavedPlansOverview() {

    const { savedPlans } = useContext(SavedPlansContext);
    const { setCurrentPlan } = useContext(CurrentPlanContext);

    const renderPlan = (choice) => {
        // if (savedPlans[value]){
        //     setCurrentPlan(savedPlans[value]);
        // }
    }

    return (
        <Row>
        <Col xs={2}>
            <Form.Control size="sm" as="select" onChange={choice => renderPlan(choice.target.value)}>
                <option value = {1}>Plan 1</option>
                <option value = {2}>Plan 2</option>
                <option value = {3}>Plan 3</option>
            </Form.Control>
        </Col>
        <Col xs={10}>
            <PlanDetails/>
        </Col>
        </Row>
    );
}
  
export default SavedPlansOverview;