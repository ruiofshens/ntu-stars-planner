import React, { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

import CourseInput from './CourseInput';
import { SelectedCoursesContext } from '../contexts/SelectedCoursesContext';

function CourseInputGroup() {
    const { selectedCourses } = useContext(SelectedCoursesContext);
    return (
        <Container className="w-100 d-flex">
            <Col className="pl-0">
                {[...Array(6)].map((value, index) => (
                    <CourseInput index={index} course={selectedCourses[index]} key={`course-input-${index}`}/>
                ))}
            </Col>
            <Col className="pr-0">
                {[...Array(6)].map((value, index) => (
                    <CourseInput index={index+6} course={selectedCourses[index+6]} key={`course-input-${index+6}`}/>
                ))}
            </Col>
            
        </Container>
    );
  }
  
  export default CourseInputGroup;