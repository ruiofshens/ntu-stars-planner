import React, { useContext } from 'react';

import Table from 'react-bootstrap/Table';

import { CurrentPlanContext } from '../contexts/CurrentPlanContext';


function PlanDetails() {

    /* currentPlan -> to display plan details */
    const { currentPlan } = useContext(CurrentPlanContext);

    return (
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
                            vacancies={course.index.vacancies}
                            waitlistLength={course.index.waitlistLength}
                            AUs={course.courseAUs}
                            examStart={course.examStart}
                            examEnd={course.examEnd}
                        />
                    )
                })}
            </tbody>
        </Table>
    )
}

function CourseRow(props) {
    return (
      <tr>
        <th scope="row">{props.rowNo}</th>
        <td>{`${props.index}/${props.vacancies}/${props.waitlistLength}`}</td>
        <td>{props.courseCodeName}</td>
        <td>{props.AUs}</td>
        <td>{props.examStart} - {props.examEnd}</td>
      </tr>
    )
  }

export default PlanDetails;