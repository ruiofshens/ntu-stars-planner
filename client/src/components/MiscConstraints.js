import React, { useState } from 'react';
import { Form, Col } from 'react-bootstrap';

const MiscConstraints = ({ miscConstraints, setMiscConstraints }) => {
  // const [noBackToBack, setNoBackToBack] = useState(false);

  return (
    <Form.Group as={Col} className="position-relative mb-3">
      <Form.Check
        className="mb-3"
        name="no-b2b"
        label="No back-to-back lessons"
        onChange={() => setMiscConstraints({...miscConstraints, noBackToBack: !miscConstraints.noBackToBack})}
        id="no-b2b"
      />
      <Form.Check
        className="mb-3"
        name="avoid-lunch-hours"
        label="Avoid lunch hours"
        onChange={() => setMiscConstraints({...miscConstraints, avoidLunchHours: !miscConstraints.avoidLunchHours})}
        id="avoid-lunch-hours"
      />
    </Form.Group>
  )
}

export default MiscConstraints;