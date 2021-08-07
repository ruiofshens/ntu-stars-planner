import React, { useContext, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
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
        <ListGroup.Item className={customOptions.displaySetting}>Waitlist and Vacancy Details included (Only from 10am-10pm)</ListGroup.Item>
        <ListGroup.Item className={customOptions.displaySetting}>Fixing of Specific Indexes</ListGroup.Item>
        <ListGroup.Item className={customOptions.displaySetting}>Editing of Timetable Plans</ListGroup.Item>
        <ListGroup.Item className={customOptions.displaySetting}>Advanced Options: Choosing Free Times, No Back To Back Lessons</ListGroup.Item>
        <ListGroup.Item className={customOptions.displaySetting}>Saving and Downloading of Plans (BETA version) </ListGroup.Item>
      </ListGroup>

      <hr/>
      <h5 className="text-center">❓ About the Website ❓</h5>
      <hr/>

      <ListGroup variant="flush">
        <ListGroup.Item className={customOptions.displaySetting}>
          Based off the current Student Automated Registration System (STARS), 
          STARS-panel serves to be an all-in-one control panel for course registration planning, addressing commonly requested functionalities for easy planning.
        </ListGroup.Item>
        <ListGroup.Item className={customOptions.displaySetting}>
          Disclaimer: All NTU data are obtained by crawling the public NTU sites; we do not own any of the data. 
          As this is an unofficial planner, we strongly encourage you to double check your timetables with the actual STARS.
        </ListGroup.Item>
      </ListGroup>

      <hr/>
      <Row className="d-flex justify-content-center font-italic pt-4 pb-3">
        may the force be with you
      </Row>
      <Row className="d-flex justify-content-center font-italic">
        ~ Build V1.0.0 ~
      </Row>
      <Row className="d-flex justify-content-center font-italic">
        <span className="text-center">
          Should you encounter any issues, please kindly help us by reporting it&nbsp;
          <a href="https://github.com/ruiofshens/ntu-stars-planner/issues" target="_blank" rel="noreferrer">here</a>.
        </span>
      </Row>
      <Row className="d-flex justify-content-center font-italic">
        <span className="text-center">Made by&nbsp;
        <a href="https://github.com/ruiofshens" target="_blank" rel="noreferrer">Chong Shen Rui</a>
        &nbsp;and&nbsp;
        <a href="https://github.com/junwei-tj" target="_blank" rel="noreferrer">Toh Jun Wei</a></span>
      </Row>
      <Row className="d-flex justify-content-center font-italic pb-4">
        <span className="text-center">
          <a target="_blank" rel="noopener noreferrer" href="https://icons8.com/icon/121624/pixel-star">Pixel Star</a>
          &nbsp;icon by&nbsp;
          <a target="_blank" rel="noopener noreferrer" href="https://icons8.com">Icons8</a>
        </span>
      </Row>
    </Container>
  );
}

export default SettingsPage;