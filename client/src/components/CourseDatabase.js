import React from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

function CourseDatabase() {
    return (
        <Card className="retrievedCourses">
        <Card.Header className="bg-secondary text-center font-weight-bold">Courses Available</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Button variant="outline-primary" className="mx-1">+</Button>
              CZ1103 Intro To Comput Thinking & Pro (3AU)
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant="outline-primary" className="mx-1">+</Button>
              CZ1104 Linear Algebra for Computing (3AU)
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant="outline-primary" className="mx-1">+</Button>
              CZ1105 Digital Logic (3AU)
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant="outline-primary" className="mx-1">+</Button>
              CZ1106 Computer Organisation & Archit (3AU)
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant="outline-primary" className="mx-1">+</Button>
              CZ1107 Data Structures & Algorithms (3AU)
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant="outline-primary" className="mx-1">+</Button>
              CZ1113 Physics For Computing (2AU)
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant="outline-primary" className="mx-1">+</Button>
              CZ1120 Intro To Digital Comm & Netwk (3AU)
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant="outline-primary" className="mx-1">+</Button>
              CZ2100 Prob & Stat For Computing (3AU)
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant="outline-primary" className="mx-1">+</Button>
              CZ2101 Algorithm Design & Analysis (3AU)
            </ListGroup.Item>
          </ListGroup>
        </Card>
    );
  }
  
  export default CourseDatabase;