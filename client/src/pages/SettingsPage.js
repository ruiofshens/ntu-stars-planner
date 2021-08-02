import React, { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup'

import { CustomisationContext } from '../contexts/CustomisationContext';

function SettingsPage() {

  const { customOptions, setCustomOptions } = useContext(CustomisationContext);

  const toggleLightDarkMode = () => {
    const tempCustomOptions = {...customOptions};
    switch (tempCustomOptions.displaySetting) {
      case "lightMode":
        tempCustomOptions.displaySetting = "darkMode";
        break;
      case "darkMode":
        tempCustomOptions.displaySetting = "lightMode";
        break;
    }
    setCustomOptions(tempCustomOptions);
  }

  
  return (
    <Container fluid 
      className={`px-4 pt-3 main ${customOptions.displaySetting}`}>

      <hr/>
      <h5 className="text-center">Customisation Options (beta)</h5>
      <hr/>

      <Form>
        <Form.Check 
          type="switch"
          id="scheme-switch"
          label={customOptions.displaySetting === "lightMode" ? "Toggle to dark mode" : "Toggle to light mode"}
          onChange={() => toggleLightDarkMode()}
        />
      </Form>

      <hr/>
      <h5 className="text-center">NTU Stars V2 - Features</h5>
      <hr/>
      
      <ListGroup variant="flush">
        <ListGroup.Item className={customOptions.displaySetting}>Automatic Timetable Generation</ListGroup.Item>
        <ListGroup.Item className={customOptions.displaySetting}>Improved Summary of Timetable Details</ListGroup.Item>
        <ListGroup.Item className={customOptions.displaySetting}>Fixing of Specific Indexes</ListGroup.Item>
        <ListGroup.Item className={customOptions.displaySetting}>Advanced Options such as Free Times, No Back To Back Lessons</ListGroup.Item>
        <ListGroup.Item className={customOptions.displaySetting}>Saving of Plans</ListGroup.Item>
      </ListGroup>

      <hr/>
      <h5 className="text-center">About Us</h5>
      <hr/>

      <Row> 
        A side-project by Chong Shen Rui and Toh Jun Wei.
      </Row>
      <Row>
        Based of the current Student Automated Registration System (STARS), 
        NTU Stars V2 serves to improve upon its existing functionality and address common use cases when using the system, 
        such as automatic timetable generation based on the modules selected and customising of plans for easy planning.
      </Row>

      <hr/>
      <Row className="d-flex justify-content-center font-italic pt-4">
        ~ Build V1.0.0 ~
      </Row>
      <Col className="d-flex justify-content-center font-italic pb-4">
        <a target="_blank" rel="noopener noreferrer" href="https://icons8.com/icon/121624/pixel-star">Pixel Star</a>
        &nbsp;icon by&nbsp;
        <a target="_blank" rel="noopener noreferrer" href="https://icons8.com">Icons8</a>
      </Col>
    </Container>
  );
}

export default SettingsPage;