import React, { useState, useContext } from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';

import { SelectedCoursesContext } from '../contexts/SelectedCoursesContext';
import { CoursesContext } from '../contexts/CoursesContext';

function CourseDatabase() {

  /* courses -> List of ALL courses in NTU, retrieved from server
    setCourses -> For Button to retrieve list of ALL courses from server
    selectedCourses -> List of selected courses by user for timetable planning
    addSelection -> For ListGroup.Item to add course to list of selected courses by user  */
  // const [courses, setCourses] = useState ([]);
  const { addSelection } = useContext(SelectedCoursesContext);
  const { courses } = useContext(CoursesContext);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInput = (e) => {
    setSearchTerm(e.target.value);
  }

  const dynamicSearch = () => {
    return courses.filter(course => course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) || course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  
  return (
    <>
    <Card className="retrievedCourses" style={{height: "30rem"}}>
    <Card.Header className="bg-secondary text-center font-weight-bold">Courses Available</Card.Header>
      {courses.length === 0 ? 
        <Spinner animation="border" role="status" variant="secondary" style={{ margin: 'auto' }}>
          <span className="sr-only">Loading...</span>
        </Spinner> :

        <ListGroup variant="flush" className="overflow-auto">
          {dynamicSearch().map(course => {
            return (
              <ListGroup.Item key ={course.courseCode}>
                <Button 
                  variant="outline-primary" 
                  className="mx-1"
                  onClick= {() => addSelection(course.courseCode)}
                  >+
                </Button>
                {course.courseCode} {course.courseName} ({course.courseAUs})
              </ListGroup.Item>
            )
          })}
        </ListGroup> 
      }
    </Card>

    <Form className="d-flex my-2" style={{width: "35%"}}>
      <Form.Control placeholder="Enter course code/name" onChange={handleInput} />
      <Button variant="outline-primary">Search</Button>
    </Form>

      {/* Temp for checking if SelectedCoursesContext works
      {selectedCourses.map(selectedCourse => {
        return (
          <h3
            key = "{selectedCourse.courseCode}">
            {selectedCourse}
          </h3> 
        )
      })} */}

      {/* <Button
        onClick={() => retrieveAllCourses()}> */}
        {/* onClick={() => console.log("hello")}> */}
        {/* Retrieve Courses!
      </Button> */}

      
    </>
  );
}
  
export default CourseDatabase;