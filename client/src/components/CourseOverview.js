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
  const { timetablePlans, setTimetablePlans } = useContext(TimetablePlansContext);
  const { currentPlan, setCurrentPlan } = useContext(CurrentPlanContext);

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
    <Row>
      <Col xs={2}>
        <Row className="px-3 my-1">
          <Button 
            variant="outline-primary mx-2 my-1" 
            size="sm"
            onClick={decreasePlanIndex}>
            {'<'}
          </Button>
          <h6 className="font-italic align-text">
            {(Object.entries(timetablePlans).length === 0) ? "Select Courses" : 
            `Plan ${timetablePlans.currentIndex + 1} of ${timetablePlans.timetables.length}`}
          </h6>
          <Button 
            variant="outline-primary mx-2 my-1" 
            size="sm"
            onClick={increasePlanIndex}>
            {'>'}
          </Button>
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
      </Col>
    </Row>
  );
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
  
export default CourseOverview;