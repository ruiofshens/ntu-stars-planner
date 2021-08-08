import React, { useState, useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import { SelectedCoursesContext } from '../contexts/SelectedCoursesContext';
import { CoursesContext } from '../contexts/CoursesContext';
import { CustomisationContext } from '../contexts/CustomisationContext';

function CourseDatabase() {

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

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Legend</Popover.Header>
      <Popover.Body style={{whiteSpace:"pre-line"}}>
        {"* : Available as UEs\n~ : Available as BDEs\n^ : Self-paced Course\n# : Available as GERPEs"}
      </Popover.Body>
    </Popover>
  );
  
  return (
    <Card className={`retrievedCourses ${customOptions.displaySetting}`} style={{height: "30rem"}} border={customOptions.displaySetting === "lightMode" ? "" : "secondary"}>
      <Card.Header className="database-title font-weight-bold">
        <Row className="align-items-center">
          <Col sm={7} xs={9}> 
            Courses Available 
            { acadSem ? ` (AY${acadSem.year}-${((parseInt(acadSem.year)+1)+"").substring(2)} Sem ${acadSem.sem})` : ""}
          </Col>
          <Col sm={4} xs={10}>
            <Form className="d-flex ml-auto">
              <Form.Control 
              placeholder="Search course code/name" 
              size="sm"
              onChange={handleInput} />
            </Form>
          </Col>
          <Col sm={1} xs={1} className="d-flex justify-content-center">
            <OverlayTrigger
              trigger="click"
              placement="left"
              delay={{ show: 250, hide: 400 }}
              overlay={popover}
            >
              <Button 
              size = "sm" 
              variant="none" 
              style={{fontWeight: "bold", color: "white", border: "1.5px solid white", borderRadius: "40px"}}>
                &nbsp;?&nbsp;
              </Button>
            </OverlayTrigger>
          </Col>
        </Row>
      </Card.Header>
      {courses.length === 0 ? 
        <Container className="d-flex flex-column justify-content-center align-items-center h-100">
          <Spinner animation="grow" role="status" variant="secondary">
            <span className="sr-only">Loading...</span>
          </Spinner> 
          <Row className="text-center pt-1">
            Almost there...
          </Row>
        </Container> :

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