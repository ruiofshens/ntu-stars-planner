import React from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

function SettingsPage() {
  return (
    <Container fluid className="px-4">
      <Form>
        <Form.Check 
          type="switch"
          id="orientaton-switch"
          label="Toggle between landscape and horizontal display for timetable"
        />
        <hr/>
        <Form.Check 
          type="switch"
          id="scheme-switch"
          label="Toggle between light and dark mode"
        />
      </Form>
    </Container>
  );
}

export default SettingsPage;