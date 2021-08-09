import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Accordion from 'react-bootstrap/Accordion';
import Spinner from 'react-bootstrap/Spinner';

import CourseInputGroup from '../components/CourseInputGroup';
import CourseDatabase from '../components/CourseDatabase';
import TimetablePlanConstraints from '../components/advanced-settings/TimetablePlanConstraints';

import TimetablesGenerator from '../services/timetables/timetablesGenerator';

import { TimetablePlansContext } from '../contexts/TimetablePlansContext';
import { SelectedCoursesContext } from '../contexts/SelectedCoursesContext';
import { CurrentPlanContext } from '../contexts/CurrentPlanContext';
import { ConstraintsContext } from '../contexts/ConstraintsContext';
import { CustomisationContext } from '../contexts/CustomisationContext';

function CourseSelectionPage() {

  const { selectedCourses } = useContext(SelectedCoursesContext);
  const { setTimetablePlans } = useContext(TimetablePlansContext);
  const { setCurrentPlan } = useContext(CurrentPlanContext);
  const { chosenIndexes, freeTimes, miscConstraints } = useContext(ConstraintsContext);
  const { customOptions } = useContext(CustomisationContext);

  const [canGenerate, setCanGenerate] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ header: null, details: null }); // for displaying why timetable could not be generated
  const [showError, setShowError] = useState(false);
  const [buttonText, setButtonText] = useState("Generate Plans!")

  const history = useHistory();

  async function retrieveTimetablePlans() {
    setButtonText("Generating...");
    if (selectedCourses.some(selectedCourse => selectedCourse !== "")){
      let generated = await TimetablesGenerator.generateAll(selectedCourses, chosenIndexes, freeTimes, miscConstraints);
      if (generated.canGenerate && generated.timetables.length !== 0) {
        setCanGenerate(true);
        setTimetablePlans({timetables: generated.timetables, currentIndex: 0});
        setCurrentPlan(generated.timetables[0]);
        history.push('/')
      } else {
        setCanGenerate(false);
        setShowError(true);
        if (generated.clashed) { // exam clash
          let clashed = "";
          generated.clashed.forEach(exam => {
            let examStart = new Date(exam.examDate).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false});
            let examEnd = new Date(exam.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
            clashed += `${exam.courseCode}\t${examStart} - ${examEnd}\n`;
          })
          setErrorMessage({
            header: `${generated.clashed.length} courses have clashing examination timings:`,
            details: clashed,
          })
        } else if (generated.timetables.length === 0) { 
          setErrorMessage({
            header: "No non-clashing timetables can be generated with the given specifications.",
            details: null,
          })
        }
      }
    }
    setButtonText("Generate Plans!");
    window.scrollTo(0, 0);
  }

  return (
    <Container fluid className={`pt-3 main ${customOptions.displaySetting}`}>
    
      {!canGenerate && showError && 
        <Row className="px-4">
          <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
            <span>{errorMessage.header}</span>
            {errorMessage.details &&
              <>
                <hr />
                <span style={{whiteSpace: "pre-wrap"}}>{errorMessage.details}</span>
              </>
            }
          </Alert>
        </Row>
      }
      <Container fluid className="d-flex vertical-if-sm">
        <Col xs={12} lg={9} className="d-flex flex-column align-items-center">
          <CourseDatabase/>
        </Col>
        <SelectedCourses 
        retrieveTimetablePlans={retrieveTimetablePlans}
        buttonText={buttonText} />
      </Container>

      <Container fluid className="mt-4 mb-2">
        <TimetablePlanConstraints />
      </Container>

    </Container>
  );
}

const SelectedCourses = ({ retrieveTimetablePlans, buttonText }) => {

  const { selectedCourses, setSelectedCourses } = useContext(SelectedCoursesContext);
  const { customOptions } = useContext(CustomisationContext);

  const InputGroup = () => {
    return(
      <>
        <CourseInputGroup/>
        <Row className="d-flex justify-content-center">
          <Button 
            className="w-75"
            variant="outline-primary m-1"
            onClick={() => retrieveTimetablePlans()}>
            {buttonText === "Generating..." ? 
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
              className="mr-2"
            /> : null}
            {buttonText}
          </Button>
          <Button 
            className="w-75"
            variant="outline-primary m-1"
            onClick={() => setSelectedCourses(Array(12).fill(""))}>
            Clear All
          </Button>
        </Row>
      </>
    )
  }

  if (window.innerWidth < 992)
    return (
      <Col xs={12} lg={3} className="pt-3 pl-0 px-0">
      <Accordion className="pt-4">
      <Accordion.Item eventKey="course-input" className={customOptions.displaySetting}>
        <Accordion.Header><strong>{`${selectedCourses.reduce((a,v) => (v !== "" ? a + 1 : a), 0)} Courses Selected`}</strong></Accordion.Header>
        <Accordion.Body>
          <InputGroup/>
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
      </Col>
    )

  else {
    return (
      <Col xs={12} lg={3} className="pt-3 pl-0">
        <h5 className="text-center">{`${selectedCourses.reduce((a,v) => (v !== "" ? a + 1 : a), 0)} Courses Selected`}</h5>
        <hr/>
        <InputGroup/>
      </Col>
    )
  }
}

export default CourseSelectionPage;