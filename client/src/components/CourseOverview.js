import React, { useContext } from 'react';

import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { TimetablePlansContext } from '../contexts/TimetablePlansContext';
import { CurrentPlanContext } from '../contexts/CurrentPlanContext';


function CourseOverview() {

  /* timetablePlans -> to have access to all the plans for toggling between them
  currentPlan -> to display plan details
  setCurrentPlan -> to change the active plan when user choose the previous/next plan */
  const { timetablePlans } = useContext(TimetablePlansContext);
  const { currentPlan, setCurrentPlan } = useContext(CurrentPlanContext);
  
  /* TODO: Variable for current plan number
  Update "Plan x of y" */
  return (
    <Row>
      <Col xs={2}>
        <Row className="px-3 my-1">
          <Button 
            variant="outline-primary mx-2 my-1" 
            size="sm"
            onClick={() => console.log("temp")}>
            {'<'}
          </Button>
          <h6 className="font-italic align-text">{`Plan 1 of ${timetablePlans.length}`}</h6>
          <Button variant="outline-primary mx-2 my-1" size="sm">{'>'}</Button>
        </Row>
      </Col>
      <Col xs={10}>
        <Table striped hover size="sm">
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
                  return (
                    <CourseRow
                      rowNo={number+1}
                      courseCodeName={`${course.courseCode} ${course.courseName}`}
                      index={course.index.indexNo}
                      AUs={course.courseAUs}
                    />
                  )
                })}

          </tbody>
        </Table>
      </Col>
    </Row>
  );
}

function CourseRow(props) {
  return (
    <tr>
      <th scope="row">{props.rowNo}</th>
      <td>{props.index}/need this/need this</td>
      <td>{props.courseCodeName}</td>
      <td>{props.AUs}</td>
      <td>need this</td>
    </tr>
  )
}
  
export default CourseOverview;