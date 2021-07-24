import React from 'react';

import { Row, Col, Accordion } from 'react-bootstrap';
import FreeTimes from './FreeTimes';
import ConstraintRules from './ConstraintRules';

/*
Change to accordions (see react-bootstrap) - one for each category

*/
const AdjustRules = (props) => {
  
  return (
    <Accordion defaultActiveKey="constraints">
      <Accordion.Item eventKey="free-times">
        <Accordion.Header><b>Free Times</b></Accordion.Header>
        <Accordion.Body>
          <FreeTimes />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="constraints">
        <Accordion.Header><b>Constraints</b></Accordion.Header>
        <Accordion.Body>
          <ConstraintRules />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default AdjustRules;