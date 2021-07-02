import React, { useState, useContext } from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import { fetchAllCourses } from '../services/DataRetriever';
import { SelectedCoursesContext } from '../contexts/SelectedCoursesContext';

function CourseDatabase() {

  /* courses -> List of ALL courses in NTU, retrieved from server
    setCourses -> For Button to retrieve list of ALL courses from server
    selectedCourses -> List of selected courses by user for timetable planning
    addSelection -> For ListGroup.Item to add course to list of selected courses by user  */
  const [courses, setCourses] = useState ([]);
  const { selectedCourses, addSelection } = useContext(SelectedCoursesContext);

  async function retrieveAllCourses() {
    let coursesJSON = await fetchAllCourses();
    setCourses(coursesJSON);
  }
  
  return (
    <Card className="retrievedCourses" style={{height: "30rem"}}>
    <Card.Header className="bg-secondary text-center font-weight-bold">Courses Available</Card.Header>
      <ListGroup variant="flush" className="overflow-auto">

        {courses.map(course => {
          return (
            <ListGroup.Item key ={course.courseCode}>
              <Button 
                variant="outline-primary" 
                className="mx-1"
                onClick= {() => addSelection(course.courseCode)}
                >+
              </Button>
              {course.courseCode} {course.courseName} ({course.AUs}AUs)
            </ListGroup.Item>
          )
        })}

      </ListGroup>

      {/* Temp for checking if SelectedCoursesContext works
      {selectedCourses.map(selectedCourse => {
        return (
          <h3
            key = "{selectedCourse.courseCode}">
            {selectedCourse}
          </h3> 
        )
      })} */}

      <Button
        onClick={() => retrieveAllCourses()}>
        {/* onClick={() => console.log("hello")}> */}
        Retrieve Courses!
      </Button>

    </Card>
  );
}
  
export default CourseDatabase;