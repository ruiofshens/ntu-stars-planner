import React, { useContext } from 'react';

import Container from 'react-bootstrap/Container';

import CourseInput from './CourseInput';
import { SelectedCoursesContext } from '../contexts/SelectedCoursesContext';

function CourseInputGroup() {
    const { selectedCourses } = useContext(SelectedCoursesContext);
    return (
        <Container className="w-75">
            {[...Array(12)].map((value, index) => (
                <CourseInput index={index} course={selectedCourses[index]} key={`course-input-${index}`}/>
            ))}
        </Container>
    );
  }
  
  export default CourseInputGroup;