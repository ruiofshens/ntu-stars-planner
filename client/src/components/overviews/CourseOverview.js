import React, { useContext } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { CurrentPlanContext } from '../../contexts/CurrentPlanContext';
import { SelectedCoursesContext } from '../../contexts/SelectedCoursesContext';
import { ConstraintsContext } from '../../contexts/ConstraintsContext';
import { SavedPlansContext } from '../../contexts/SavedPlansContext';
import { SavedSelectedCoursesContext } from '../../contexts/SavedSelectedCoursesContext';
import { SavedConstraintsContext } from '../../contexts/SavedConstraintsContext';

import PlanDetails from '../PlanDetails';

import storageAvailable from '../../services/storageAvailable';

function CourseOverview() {

  const { currentPlan } = useContext(CurrentPlanContext);
  const { selectedCourses } = useContext(SelectedCoursesContext);
  const { freeTimes } = useContext(ConstraintsContext);

  const { savedPlans, setSavedPlans } = useContext(SavedPlansContext);
  const { savedSelectedCourses, setSavedSelectedCourses } = useContext(SavedSelectedCoursesContext);
  const { savedFreeTimes, setSavedFreeTimes } = useContext(SavedConstraintsContext);

  //Save the currently active generated timetable to the selected plan
  //First check if currentPlan is already defined
  const saveToPlan = (value) => {
    if (value !== "-1" && currentPlan.length !== 0) {
      //Save current timetable
      let tempSavedPlans = savedPlans;
      tempSavedPlans.plans[value] = [...currentPlan];
      setSavedPlans({...tempSavedPlans, currentIndex: tempSavedPlans.currentIndex});

      //Save currently selected courses
      let tempSavedSelectedCourses = savedSelectedCourses;
      tempSavedSelectedCourses.selectedCourses[value] = [...selectedCourses];
      setSavedSelectedCourses({...tempSavedSelectedCourses});

      //Save currently selected free times
      let tempSavedFreeTimes = savedFreeTimes;
      tempSavedFreeTimes.freeTimes[value] = [...freeTimes];
      setSavedFreeTimes({...tempSavedFreeTimes});
      
      alert(`Saved to Plan ${+value+1}!`); //Unary plus operator converts value to number in string literal
      if (storageAvailable("localStorage")) {
        localStorage.setItem(`saved-plans-${+value+1}`, JSON.stringify(tempSavedPlans.plans[value]));
        localStorage.setItem(`saved-selectedCourses-${+value+1}`, JSON.stringify(tempSavedSelectedCourses.selectedCourses[value]));
        localStorage.setItem(`saved-freeTimes-${+value+1}`, JSON.stringify(tempSavedFreeTimes.freeTimes[value]));
      } else {
        alert("Your browser does not support local storage or the storage has ran out of space. " +
              "Either use another browser or clear your browsing history for this site to keep your saved plans across different sessions.")
      }
    }
  }

  return (
    <Row>
      <Col xs={12} lg={1} className="d-flex flex-column align-items-center">
        Save To:
        <Row className="px-1 pb-4 my-1 align-items-center">
          <Form.Control size="sm" as="select" onChange={choice => saveToPlan(choice.target.value)}>
              <option value = {-1}>Choose Plan</option>
              <option value = {0}>Plan 1</option>
              <option value = {1}>Plan 2</option>
              <option value = {2}>Plan 3</option>
          </Form.Control>
        </Row>
      </Col>
      <Col xs={12} lg={11}>
        <PlanDetails/>
      </Col>
    </Row>
  );
}
  
export default CourseOverview;