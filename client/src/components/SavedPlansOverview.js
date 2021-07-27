import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import PlanDetails from './PlanDetails';

function SavedPlansOverview() {

  return (
    <Row>
      <Col xs={2}>
        <Form.Control size="sm" as="select">
            <option>Plan 1</option>
            <option>Plan 2</option>
            <option>Plan 3</option>
        </Form.Control>
      </Col>
      <Col xs={10}>
        <PlanDetails/>
      </Col>
    </Row>
  );
}
  
export default SavedPlansOverview;