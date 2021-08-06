import React, { useContext, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup'

import { CustomisationContext } from '../contexts/CustomisationContext';

function SettingsPage() {

  const { customOptions, setCustomOptions } = useContext(CustomisationContext);
  const [ darkModeToggled, setDarkModeToggled ] = useState(customOptions.displaySetting === "darkMode");

  const toggleLightDarkMode = () => {
    const tempCustomOptions = {...customOptions};
    switch (tempCustomOptions.displaySetting) {
      case "lightMode":
        tempCustomOptions.displaySetting = "darkMode";
        document.body.style.backgroundColor = "var(--dark)";
        setDarkModeToggled(true);
        break;
      case "darkMode":
        tempCustomOptions.displaySetting = "lightMode";
        document.body.style.backgroundColor = "var(--light)";
        setDarkModeToggled(false);
        break;
      default:
        break;
    }
    setCustomOptions(tempCustomOptions);
  }

  
  return (
    <Container fluid 
      className={`px-4 pt-3 main ${customOptions.displaySetting}`}>

      <hr/>
      <h5 className="text-center">⚙️ Customisation Options ⚙️</h5>
      <hr/>

      <Form>
        <Form.Check 
          type="switch"
          id="scheme-switch"
          label={customOptions.displaySetting === "lightMode" ? "Toggle to dark mode" : "Toggle to light mode"}
          onChange={() => toggleLightDarkMode()}
          defaultChecked={darkModeToggled}
        />
      </Form>

      <hr/>
      <h5 className="text-center">✔️ The Features ✔️</h5>
      <hr/>
      
      <ListGroup variant="flush">
        <ListGroup.Item className={customOptions.displaySetting}>Automatic Timetable Generation</ListGroup.Item>
        <ListGroup.Item className={customOptions.displaySetting}>Waitlist and Vacancy Details included (10am to 10pm)</ListGroup.Item>
        <ListGroup.Item className={customOptions.displaySetting}>Fixing of Specific Indexes</ListGroup.Item>
        <ListGroup.Item className={customOptions.displaySetting}>Editing of Timetable Plans</ListGroup.Item>
        <ListGroup.Item className={customOptions.displaySetting}>Advanced Options: Choosing Free Times, No Back To Back Lessons</ListGroup.Item>
        <ListGroup.Item className={customOptions.displaySetting}>Saving and Downloading of Plans</ListGroup.Item>
      </ListGroup>

      <hr/>
      <h5 className="text-center">❓ About the Website ❓</h5>
      <hr/>

      <Row>
        Based of the current Student Automated Registration System (STARS), 
        NTU Stars V2 serves to improve upon its existing functionality and address common use cases when using the system, 
        such as automatic timetable generation based on the modules selected and customising of plans for easy planning.
      </Row>

      <hr/>
      <Row className="d-flex justify-content-center font-italic pt-4 pb-3">
        may the force be with you
      </Row>
      <Row className="d-flex justify-content-center font-italic">
        ~ Build V1.0.0 ~
      </Row>
      <Row className="d-flex justify-content-center font-italic">
        Made by Chong Shen Rui and Toh Jun Wei
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