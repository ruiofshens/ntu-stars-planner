import React, { useContext } from 'react';

import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';

import { CurrentPlanContext } from '../contexts/CurrentPlanContext';
import { CustomisationContext } from '../contexts/CustomisationContext';


function PlanDetails() {

    const { currentPlan } = useContext(CurrentPlanContext);
    const { customOptions } = useContext(CustomisationContext);

    return (<>
        <Table responsive striped hover size="sm" variant={customOptions.displaySetting === "lightMode" ? "light" : "dark"}>
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Index/Waitlist/Vacancy</th>
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
        {currentPlan.length !== 0 ?
            <ListGroup horizontal className="legend">
                <ListGroup.Item className="flex-fill" variant="secondary">Legend:</ListGroup.Item>
                <ListGroup.Item className="flex-fill">* Available as UEs</ListGroup.Item>
                <ListGroup.Item className="flex-fill">~ Available as BDEs</ListGroup.Item>
                <ListGroup.Item className="flex-fill">^ Self-paced Course</ListGroup.Item>
                <ListGroup.Item className="flex-fill"># Available as GERPEs</ListGroup.Item>
            </ListGroup> : null
        }
    </>
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