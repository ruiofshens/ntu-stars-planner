import React, { useContext } from 'react';

import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';

import { CurrentPlanContext } from '../contexts/CurrentPlanContext';
import { CustomisationContext } from '../contexts/CustomisationContext';


function PlanDetails() {

    const { currentPlan } = useContext(CurrentPlanContext);
    const { customOptions } = useContext(CustomisationContext);

    return (
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
                            key={`plan-details-row-${number+1}`}
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
        <th id={`plan-details-row-no-${props.rowNo}`} scope="row">{props.rowNo}</th>
        <td id={`plan-details-index-${props.rowNo}`}>{`${props.index}/${props.vacancies}/${props.waitlistLength}`}</td>
        <td id={`plan-details-course-name-${props.rowNo}`}>{props.courseCodeName}</td>
        <td id={`plan-details-aus-${props.rowNo}`}>{props.AUs}</td>
        <td id={`plan-details-exam-${props.rowNo}`}>{props.examStart} - {props.examEnd}</td>
      </tr>
    )
  }

export default PlanDetails;