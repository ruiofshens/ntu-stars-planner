import React, { useContext } from 'react';

import { Form, Col } from 'react-bootstrap';

import { ConstraintsContext } from '../../contexts/ConstraintsContext';

const MiscConstraints = () => {
  const { miscConstraints, setMiscConstraints } = useContext(ConstraintsContext);

  return (
    <Form.Group as={Col} className="position-relative mb-3">
      <Form.Check
        className="mb-3"
        name="no-b2b"
        label="No back-to-back lessons"
        onChange={() => setMiscConstraints({...miscConstraints, noBackToBack: !miscConstraints.noBackToBack})}
        id="no-b2b"
        defaultChecked={miscConstraints.noBackToBack}
      />
    </Form.Group>
  )
}

export default MiscConstraints;