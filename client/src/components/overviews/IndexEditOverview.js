import React, { useContext, useEffect, useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';

import { CoursesContext } from '../../contexts/CoursesContext';
import { CustomisationContext } from '../../contexts/CustomisationContext';

import { CurrentPlanContext } from '../../contexts/CurrentPlanContext';
import { SelectedCoursesContext } from '../../contexts/SelectedCoursesContext';
import { ConstraintsContext } from '../../contexts/ConstraintsContext';

import { SavedPlansContext } from '../../contexts/SavedPlansContext';
import { SavedSelectedCoursesContext } from '../../contexts/SavedSelectedCoursesContext';
import { SavedConstraintsContext } from '../../contexts/SavedConstraintsContext';

import { Form } from 'react-bootstrap';
import { fetchVacanciesAndWaitlist } from '../../services/DataRetriever';

import storageAvailable from '../../services/storageAvailable';

function IndexEditOverview() {
  
  const { courses } = useContext(CoursesContext);
  const { customOptions } = useContext(CustomisationContext);

  const { currentPlan, setCurrentPlan } = useContext(CurrentPlanContext);
  const { selectedCourses } = useContext(SelectedCoursesContext);
  const { freeTimes } = useContext(ConstraintsContext);


  const { savedPlans, setSavedPlans } = useContext(SavedPlansContext);
  const { savedSelectedCourses, setSavedSelectedCourses } = useContext(SavedSelectedCoursesContext);
  const { savedFreeTimes, setSavedFreeTimes } = useContext(SavedConstraintsContext);

  const planToEdit = [...currentPlan];

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
        <Table responsive striped hover size="sm" variant={customOptions.displaySetting === "lightMode" ? "light" : "dark"}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Index/Vacancy/Waitlist</th>
            <th scope="col">Course Code/Name</th>
            <th scope="col">AUs</th>
            <th scope="col">Exam Timing</th>
          </tr>
        </thead>

        <tbody>
          {currentPlan.map((course, number) => {
            const courseObj = courses.filter(thisCourse => thisCourse.courseCode === course.courseCode)[0];
            return (
              <CourseRow
                rowNo={number+1}
                course={courseObj}
                courseCodeName={`${course.courseCode} ${course.courseName}`}
                currIndex={course.index}
                AUs={course.courseAUs}
                examStart={course.examStart}
                examEnd={course.examEnd}
                planToEdit={planToEdit}
                setCurrentPlan={setCurrentPlan}
                key={`edit-index-row-${number+1}`}
              />
            )
          })}
        </tbody>
      </Table>
      </Col>
    </Row>
  )
}

function CourseRow(props) {
  const [indexes, setIndexes] = useState([]); // holds vacancies and waitlist data for each index

  useEffect(() => {
    if (!props.course) return; // temp fix
    async function getVacanciesAndWaitlist() {
      const indexes = await fetchVacanciesAndWaitlist(props.course.courseCode);
      if (indexes.length === 0) { // retrieved after 10pm
        props.course.indexes.forEach(index => indexes.push({
          indexNo: index.indexNo,
          vacancies: "NA",
          waitlistLength: "NA"
        }))
      }
      const fullTimeIndexes = [];
      indexes.forEach(index => {
        if (props.course.indexes.filter(ftIndex => ftIndex.indexNo === index.indexNo).length !== 0) { // find if index number exists in props.course, which only has FT indexes
          fullTimeIndexes.push(index);
        }
      });
      setIndexes(fullTimeIndexes);
    }
    getVacanciesAndWaitlist();
  }, []);

  const handleIndexChange = (e) => {
    const indexNo = e.target.value;
    // make a copy of the course and change its index
    const courseToEdit = props.planToEdit.filter(course => course.courseCode === props.course.courseCode)[0]; 
    const courseEdited = {...courseToEdit};
    courseEdited.index = props.course.indexes.filter(index => index.indexNo === indexNo)[0];
    courseEdited.index.vacancies = indexes.filter(index => index.indexNo === indexNo)[0].vacancies;
    courseEdited.index.waitlistLength = indexes.filter(index => index.indexNo === indexNo)[0].waitlistLength;
    // replace old course with new course
    const position = props.planToEdit.indexOf(courseToEdit);
    props.planToEdit[position] = courseEdited;

    props.setCurrentPlan(props.planToEdit);
  }

  return (
    <tr>
      <th scope="row">{props.rowNo}</th>
      <td>
        <Form className="mr-4">
          <Form.Select size="sm" aria-label="select-index" onChange={handleIndexChange} value={props.currIndex.indexNo}>
            {indexes.map(index => (
              <option id={index.indexNo} value={index.indexNo} key={index.indexNo}>
                {`${index.indexNo}/${index.vacancies}/${index.waitlistLength}`}
              </option>
            ))}
          </Form.Select>
        </Form>
      </td>
      <td>{props.courseCodeName}</td>
      <td>{props.AUs}</td>
      <td>{props.examStart} - {props.examEnd}</td>
    </tr>
  )
}

export default IndexEditOverview;