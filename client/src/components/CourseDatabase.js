import React, { useState, useContext } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';

import { SelectedCoursesContext } from '../contexts/SelectedCoursesContext';
import { CoursesContext } from '../contexts/CoursesContext';
import { CustomisationContext } from '../contexts/CustomisationContext';

function CourseDatabase() {

  /* courses -> List of ALL courses in NTU, retrieved from server
     acadSem -> Current semester in NTU
     addSelection -> For adding course to currently selected courses  */
  const { addSelection } = useContext(SelectedCoursesContext);
  const { courses, acadSem } = useContext(CoursesContext);
  const { customOptions } = useContext(CustomisationContext);

  const [searchTerm, setSearchTerm] = useState("");

  const handleInput = (e) => {
    setSearchTerm(e.target.value);
  }

  const dynamicSearch = () => {
    return courses.filter(course => course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) || course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  
  return (
    <Card className={`retrievedCourses ${customOptions.displaySetting}`} style={{height: "45rem"}} border={customOptions.displaySetting === "lightMode" ? "" : "secondary"}>
      <Card.Header className="database-title font-weight-bold">
        <Row className="align-items-center">
          <Col sm={8} xs={9}> 
            Courses Available 
            { acadSem ? ` (AY${acadSem.year}-${((parseInt(acadSem.year)+1)+"").substring(2)} Sem ${acadSem.sem})` : ""}
          </Col>
          <Col sm={4} xs={12}>
            <Form className="d-flex ml-auto">
              <Form.Control 
              placeholder="Search course code/name" 
              size="sm"
              onChange={handleInput} />
            </Form>
          </Col>
        </Row>
      </Card.Header>
      {courses.length === 0 ? 
        <Spinner animation="border" role="status" variant="secondary" style={{ margin: 'auto' }}>
          <span className="sr-only">Loading...</span>
        </Spinner> :

        <ListGroup variant="flush" className="overflow-auto">
          {dynamicSearch().map(course => {
            return (
              <ListGroup.Item 
              key ={course.courseCode} 
              variant={customOptions.displaySetting === "lightMode" ? "light" : "dark"}>
                <Button 
                  variant="outline-primary" 
                  className="mx-1"
                  size="sm"
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
  );
}
  
export default CourseDatabase;