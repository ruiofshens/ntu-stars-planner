import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

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

  const { selectedCourses, setSelectedCourses } = useContext(SelectedCoursesContext);
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
    setButtonText("Generating....");
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
        <Col xs={12} lg={3} className="pt-3 pl-0">
          <h5 className="text-center">Courses Selected</h5>
          <hr/>
          <CourseInputGroup/>
          <Row className="d-flex justify-content-center">
            <Button 
            className="w-50"
              variant="outline-primary m-1"
              onClick={() => retrieveTimetablePlans()}>
              {buttonText}
            </Button>
            <Button 
            className="w-50"
              variant="outline-primary m-1"
              onClick={() => setSelectedCourses(Array(12).fill(""))}>
              Clear All
            </Button>
          </Row>
        </Col>
      </Container>

      <Container fluid className="mt-4 mb-2">
        <TimetablePlanConstraints />
      </Container>

    </Container>
  );
}

export default CourseSelectionPage;