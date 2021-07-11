import React from 'react';

import { Row, Col } from 'react-bootstrap';
import FreeHours from './FreeHours';

const AdjustRules = (props) => {
  
  return (
    <Row>
      <Col>
        <span><b>Free Hours</b></span>
        <FreeHours />
      </Col>
      <Col>
        <span><b>Use Specific Indexes</b></span>
      </Col>
      <Col>
        <span><b>Options</b></span>
      </Col>
    </Row>
  )
}

export default AdjustRules;