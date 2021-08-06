import React, { useContext, createRef, useState } from 'react';
import { useScreenshot, createFileName } from 'use-react-screenshot';

import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Timetable from '../components/timetable/Timetable';
import CourseOverview from '../components/overviews/CourseOverview';
import IndexEditOverview from '../components/overviews/IndexEditOverview';
import SavedPlansOverview from '../components/overviews/SavedPlansOverview';

import { CurrentPlanContext } from '../contexts/CurrentPlanContext';
import { TimetablePlansContext } from '../contexts/TimetablePlansContext';
import { SavedPlansContext } from '../contexts/SavedPlansContext';
import { CustomisationContext } from '../contexts/CustomisationContext';


function TimetablePage() {

  /* timetablePlans -> to have access to generated timetablePlans when toggling
  setTimetablePlans -> to update currently active plan
  currentPlan -> to check if currentPlan has been defined already
  setCurrentPlan -> to have access to current plan of timetablePlans when toggling
  savedPlans ->  to have access to array of savedPlans to display when toggling to "Save Plan" */
  const { timetablePlans, setTimetablePlans } = useContext(TimetablePlansContext);
  const { savedPlans } = useContext(SavedPlansContext);
  const { currentPlan, setCurrentPlan } = useContext(CurrentPlanContext);
  const { customOptions } = useContext(CustomisationContext);

  const [currentTab, setCurrentTab] = useState("choose-plan");

  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0
  })

  const download = (image, { name = "timetable", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  }

  const downloadScreenshot = () => {
    takeScreenShot(ref.current).then(download);
  }

  // for raising unsaved changes alert when user exits edit plans
  const exitEditPlan = (nextTabKey) => {
    let exit = true;
    if (!timetablePlans.timetables || currentTab !== "edit-plan") { // empty timetable
      setCurrentTab(nextTabKey);
      return exit;
    }
    if (!timetablePlans.timetables.includes(currentPlan)) // tabbing out of edit plans
      exit = window.confirm("Finished editing? Any unsaved changes will be lost.")
    if (!exit) {
      setCurrentTab("edit-plan");
    } else {
      setCurrentTab(nextTabKey);
    }
    return exit;
  }

  //Allows toggling between plan generated by timetable generator or saved plans
  //Called when user clicks on either of the tabs
  const togglePlanToShow = (key) => {
    switch (key) {
      case "edit-plan":
        setCurrentTab("edit-plan");
        break;
      case "choose-plan":
        if (!exitEditPlan("choose-plan")) break;
        if (currentPlan.length !== 0) //Check if current plan is defined alr first
          setCurrentPlan(timetablePlans.timetables[timetablePlans.currentIndex]);
        break;
      case "save-plan":
        if (!exitEditPlan("save-plan")) break;
        if (savedPlans.plans[savedPlans.currentIndex]) //Check if saved plan is defined alr first
          setCurrentPlan(savedPlans.plans[savedPlans.currentIndex]);
        else if (timetablePlans.timetables) {
          setCurrentPlan(timetablePlans.timetables[timetablePlans.currentIndex]); // set back generated plan to avoid showing edited plan
        }
        break;
      default:
        break;
    }
  }

  const decreasePlanIndex = () => {
    if ( timetablePlans.length !== 0 && timetablePlans.currentIndex !== 0){
      setCurrentPlan(timetablePlans.timetables[timetablePlans.currentIndex - 1]);
      setTimetablePlans({...timetablePlans, currentIndex: timetablePlans.currentIndex - 1});
    }
  }

  const increasePlanIndex = () => {
    if (timetablePlans.length !== 0 && timetablePlans.currentIndex !== (timetablePlans.timetables.length - 1)){
      setCurrentPlan(timetablePlans.timetables[timetablePlans.currentIndex + 1]);
      setTimetablePlans({...timetablePlans, currentIndex: timetablePlans.currentIndex + 1});
    }
  }

  return (
    <Container fluid className={`px-0 main ${customOptions.displaySetting}`}>
      <Row className="mx-0 pt-3 align-items-center">
        {currentTab === "choose-plan" ?
        <Col className="d-flex flex-row top-row-toggle">
          <Col xs="auto">
            <Button 
              variant="outline-primary my-1" 
              size="sm"
              onClick={decreasePlanIndex}>
              {'<'}
            </Button>
          </Col>
          <Col xs="auto" className=" font-italic align-plan-text">
              {(Object.entries(timetablePlans).length === 0) ? "Select Courses" : 
              `Plan ${timetablePlans.currentIndex + 1}/${timetablePlans.timetables.length}`}
          </Col>
          <Col xs="auto">
            <Button 
              variant="outline-primary my-1" 
              size="sm"
              onClick={increasePlanIndex}>
              {'>'}
            </Button>
          </Col>
        </Col>  : null }
          
        <Col className="d-flex top-row-download">
          <Button 
            variant="outline-primary my-1" 
            size="sm"
            className="mx-2"
            onClick={downloadScreenshot}>
            {'Download Timetable'}
          </Button>
        </Col>        
      </Row>

      <Container fluid ref={ref}>
        <Timetable />
      </Container>

      <Container fluid className ="pt-2">
          <Tabs 
          variant="pills"
          activeKey={currentTab}
          id="toggle-course-overview" 
          className="mb-3 tabs"
          onSelect={togglePlanToShow}>
            <Tab eventKey="choose-plan" title="Generated Plans">
              <CourseOverview/>
            </Tab>
            <Tab eventKey="edit-plan" title="Edit Current Plan">
              <IndexEditOverview/>
            </Tab>
            <Tab eventKey="save-plan" title="Saved Plans">
              <SavedPlansOverview/>
            </Tab>
          </Tabs>
      </Container>
    </Container>
  );
}

export default TimetablePage;