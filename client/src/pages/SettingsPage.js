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
      case "light":
        tempCustomOptions.displaySetting = "dark";
        break;
      case "dark":
        tempCustomOptions.displaySetting = "light";
        break;
    }
    setCustomOptions(tempCustomOptions);
  }

  
  return (
    <Container fluid 
      className={(customOptions.displaySetting === "light") ? "px-4 pt-3 lightModeBg" : "px-4 pt-3 darkModeBg"}>

      <hr/>
      <h5 className={(customOptions.displaySetting) === "light" ? "text-center lightModeText" : "text-center darkModeText"}>Customisation Options (beta)</h5>
      <hr/>

      <Form>
        <Form.Check 
          type="switch"
          id="scheme-switch"
          className={(customOptions.displaySetting) === "light" ? "lightModeText" : "darkModeText"}
          label="Toggle between light and dark mode"
          onChange={() => toggleLightDarkMode()}
        />
      </Form>

      <hr/>
      <h5 className={(customOptions.displaySetting) === "light" ? "text-center lightModeText" : "text-center darkModeText"}>NTU Stars V2 - Features</h5>
      <hr/>
      
      <ListGroup variant="flush">
        <ListGroup.Item>Automatic Timetable Generation</ListGroup.Item>
        <ListGroup.Item>Improved Summary of Timetable Details</ListGroup.Item>
        <ListGroup.Item>Fixing of Specific Indexes</ListGroup.Item>
        <ListGroup.Item>Advanced Options such as Free Times, No Back To Back Lessons</ListGroup.Item>
        <ListGroup.Item>Saving of Plans</ListGroup.Item>
      </ListGroup>

      <hr/>
      <h5 className={(customOptions.displaySetting) === "light" ? "text-center lightModeText" : "text-center darkModeText"}>About Us</h5>
      <hr/>

      <Row className={(customOptions.displaySetting) === "light" ? "lightModeText" : "darkModeText"}> 
        A side-project by Chong Shen Rui and Toh Jun Wei.
      </Row>
      <Row className={(customOptions.displaySetting) === "light" ? "lightModeText" : "darkModeText"}>
        Based of the current Student Automated Registration System (STARS), 
        NTU Stars V2 serves to improve upon its existing functionality and address common use cases when using the system, 
        such as automatic timetable generation based on the modules selected and customising of plans for easy planning.
      </Row>

      <hr/>
      <Row className={(customOptions.displaySetting) === "light" ? "d-flex justify-content-center font-italic pt-4 lightModeText" : "d-flex justify-content-center font-italic pt-4 darkModeText"}>
        ~ Build V1.0.0 ~
      </Row>
      <Col className={(customOptions.displaySetting) === "light" ? "d-flex justify-content-center font-italic pb-4 lightModeText" : "d-flex justify-content-center font-italic pb-4 darkModeText"}>
        <a target="_blank" href="https://icons8.com/icon/121624/pixel-star">Pixel Star</a>
        &nbsp;icon by&nbsp;
        <a target="_blank" href="https://icons8.com">Icons8</a>
      </Col>
    </Container>
  );
}

export default SettingsPage;