import React, { useContext } from 'react';

import Container from 'react-bootstrap/Container';

import CourseInput from './CourseInput';

import { SelectedCoursesContext } from '../contexts/SelectedCoursesContext';

function CourseInputGroup() {

    //Consume context for currently selected courses
    const { selectedCourses, addSelection, removeSelection } = useContext(SelectedCoursesContext);

    return (
        <Container className="w-75">

            {[...Array(7)].map((value, index) => (
                    <CourseInput course={index}/>
                )
            )}

            
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