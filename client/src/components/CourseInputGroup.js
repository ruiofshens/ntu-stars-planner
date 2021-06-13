import React from 'react';

import Container from 'react-bootstrap/Container';

import CourseInput from './CourseInput';

function CourseInputGroup() {

    return (
        <Container className="w-75">

            {[...Array(7)].map((value, index) => (
                <CourseInput course={index}/>
            ))}

        </Container>
    );
  }
  
  export default CourseInputGroup;