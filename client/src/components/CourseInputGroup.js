import React, { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';

import { SelectedCoursesContext } from '../contexts/SelectedCoursesContext';

function CourseInputGroup() {

    //Consume context for currently selected courses
    const { selectedCourses } = useContext(SelectedCoursesContext);

    return (
        <Container className="w-75">
            <InputGroup className="mb-3">
                <Button variant="outline-secondary" id="selection1">-</Button>
                <FormControl
                    aria-label="selection-1"
                    aria-describedby="selection-1"
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <Button variant="outline-secondary" id="selection2">-</Button>
                <FormControl
                    aria-label="selection-2"
                    aria-describedby="selection-2"
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <Button variant="outline-secondary" id="selection3">-</Button>
                <FormControl
                    aria-label="selection-3"
                    aria-describedby="selection-3"
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <Button variant="outline-secondary" id="selection4">-</Button>
                <FormControl
                    aria-label="selection-4"
                    aria-describedby="selection-4"
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <Button variant="outline-secondary" id="selection5">-</Button>
                <FormControl
                    aria-label="selection-5"
                    aria-describedby="selection-5"
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <Button variant="outline-secondary" id="selection6">-</Button>
                <FormControl
                    aria-label="selection-6"
                    aria-describedby="selection-6"
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <Button variant="outline-secondary" id="selection7">-</Button>
                <FormControl
                    aria-label="selection-7"
                    aria-describedby="selection-7"
                />
            </InputGroup>
            
            {/* Temp code to check if context passing has worked*/}

            {/* {selectedCourses.map(selectedCourse => {
              return (
                    <h3>
                    {selectedCourse.courseCode}
                    </h3> 
              )
            })} */}

        </Container>
    );
  }
  
  export default CourseInputGroup;