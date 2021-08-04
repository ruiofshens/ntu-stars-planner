import React, { useContext, useEffect, useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import { TimetablePlansContext } from '../contexts/TimetablePlansContext';
import { SelectedCoursesContext } from '../contexts/SelectedCoursesContext';
import { CurrentPlanContext } from '../contexts/CurrentPlanContext';
import { CustomisationContext } from '../contexts/CustomisationContext';
import { CoursesContext } from '../contexts/CoursesContext';
import { Form } from 'react-bootstrap';
import { fetchVacanciesAndWaitlist } from '../services/DataRetriever';

function IndexEditOverview() {
  const { selectedCourses } = useContext(SelectedCoursesContext);
  const { setTimetablePlans } = useContext(TimetablePlansContext);
  const { setCurrentPlan } = useContext(CurrentPlanContext);
  const { courses } = useContext(CoursesContext);

  /* currentPlan -> to display plan details */
  const { currentPlan } = useContext(CurrentPlanContext);
  const { customOptions } = useContext(CustomisationContext);

  const planToEdit = [...currentPlan];

  return (
    <Table striped hover size="sm" variant={customOptions.displaySetting === "lightMode" ? "light" : "dark"}>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Index/Waitlist/Vacancy</th>
          <th scope="col">Course Code and Name</th>
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
            />
          )
        })}
      </tbody>
    </Table>
  )
}

function CourseRow(props) {
  const [indexes, setIndexes] = useState([]); // holds vacancies and waitlist data for each index

  useEffect(() => {
    async function getVacanciesAndWaitlist() {
      const indexes = await fetchVacanciesAndWaitlist(props.course.courseCode);
      setIndexes(indexes);
    }
    getVacanciesAndWaitlist();
  }, []);

  const handleIndexChange = (e) => {
    const indexNo = e.target.value;
    // make a copy of the course and change its index
    const courseToEdit = props.planToEdit.filter(course => course.courseCode === props.course.courseCode)[0]; 
    const courseEdited = {...courseToEdit};
    courseEdited.index = props.course.indexes.filter(index => index.indexNo === indexNo)[0];
    // replace old course with new course
    const position = props.planToEdit.indexOf(courseToEdit);
    props.planToEdit[position] = courseEdited;

    props.setCurrentPlan(props.planToEdit);
  }

  return (
    <tr>
      <th scope="row">{props.rowNo}</th>
      <td>
        <Form className="mr-5">
          <Form.Select aria-label="select-index" onChange={handleIndexChange} value={props.currIndex.indexNo}>
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