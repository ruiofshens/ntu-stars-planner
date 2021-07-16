import React, { useContext } from 'react';

import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';

import { CurrentPlanContext } from '../contexts/CurrentPlanContext';

function IndexEditOverview() {

    /* currentPlan -> to display plan details */
    const { currentPlan } = useContext(CurrentPlanContext);
  
    return (
      <Row>
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
                    examStart={course.examStart}
                    examEnd={course.examEnd}
                    />
                )
            })}
        </tbody>
        </Table>
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
        <td>{props.examStart} - {props.examEnd}</td>
      </tr>
    )
  }
  
  export default IndexEditOverview;