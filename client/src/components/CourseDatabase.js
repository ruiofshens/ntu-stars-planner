import React, { useState, useContext } from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import { fetchCourses } from '../api/DataRetriever';
import { SelectedCoursesContext } from '../contexts/SelectedCoursesContext';

function CourseDatabase() {

  const [courses, setCourses] = useState ([
    // {courseCode: "CZ1103", courseName:"Intro To Comput Thinking & Pro", AUs: 3},
    // {courseCode: "CZ1104", courseName:"Linear Algebra for Computing", AUs: 3},
    // {courseCode: "CZ1105", courseName:"Digital Logic", AUs: 3},
    // {courseCode: "CZ1106", courseName:"Computer Organisation & Archit", AUs: 3},
    // {courseCode: "CZ1107", courseName:"Data Structures & Algorithms", AUs: 3},
    // {courseCode: "CZ1113", courseName:"Physics For Computing", AUs: 2},
    // {courseCode: "CZ1120", courseName:"Intro To Digital Comm & Netwk", AUs: 3},
    // {courseCode: "CZ2100", courseName:"Prob & Stat For Computing", AUs: 3},
    // {courseCode: "CZ2101", courseName:"Algorithm Design & Analysis", AUs: 3},
  ]);

  //Consume context for currently selected courses
  const { selectedCourses, addSelection } = useContext(SelectedCoursesContext);

  async function retrieveFromBack() {
    let coursesJSON = await fetchCourses();
    setCourses(coursesJSON.data);
  }
  
    return (
        <Card className="retrievedCourses" style={{height: "30rem"}}>
        <Card.Header className="bg-secondary text-center font-weight-bold">Courses Available</Card.Header>
          <ListGroup variant="flush" className="overflow-auto">

            {courses.map(course => {
              return (
                <ListGroup.Item
                key ={course.courseCode} >
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

          {/* Temp for checking if SelectedCoursesContext works */}
          {selectedCourses.map(selectedCourse => {
                        return (
                              <h3
                              key = "{selectedCourse.courseCode}">
                              {selectedCourse.courseCode}
                              </h3> 
                        )
                      })}

          <Button
            onClick={() => retrieveFromBack()}>
            Retrieve Courses!
          </Button>

        </Card>
    );
  }
  
  export default CourseDatabase;