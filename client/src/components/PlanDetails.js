import React, { useContext } from 'react';

import Table from 'react-bootstrap/Table';

import { CurrentPlanContext } from '../contexts/CurrentPlanContext';
import { CustomisationContext } from '../contexts/CustomisationContext';


function PlanDetails() {

    /* currentPlan -> to display plan details */
    const { currentPlan } = useContext(CurrentPlanContext);
    const { customOptions } = useContext(CustomisationContext);

    return (
        <Table striped hover size="sm" className={customOptions.displaySetting}>
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
    const { customOptions } = useContext(CustomisationContext);

    return (
      <tr>
        <th className={customOptions.displaySetting} scope="row">{props.rowNo}</th>
        <td className={customOptions.displaySetting}>{`${props.index}/${props.vacancies}/${props.waitlistLength}`}</td>
        <td className={customOptions.displaySetting}>{props.courseCodeName}</td>
        <td className={customOptions.displaySetting}>{props.AUs}</td>
        <td className={customOptions.displaySetting}>{props.examStart} - {props.examEnd}</td>
      </tr>
    )
  }

export default PlanDetails;