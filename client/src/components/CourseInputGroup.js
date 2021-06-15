import React, { useContext } from 'react';

import Container from 'react-bootstrap/Container';

import CourseInput from './CourseInput';
import { SelectedCoursesContext } from '../contexts/SelectedCoursesContext';

function CourseInputGroup() {
    const { selectedCourses } = useContext(SelectedCoursesContext);
    console.log(selectedCourses);
    return (
        <Container className="w-75">
            {[...Array(7)].map((value, index) => (
                <CourseInput index={index} course={selectedCourses[index]}/>
            ))}
        </Container>
    );
  }
  
  export default CourseInputGroup;