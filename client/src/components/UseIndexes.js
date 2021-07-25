import React, { useState, useContext, useEffect } from 'react';

import { Col, Form } from 'react-bootstrap';
import Select from 'react-select'; 
import makeAnimated from 'react-select/animated'

import { fetchCourses } from '../services/DataRetriever';
import { SelectedCoursesContext } from '../contexts/SelectedCoursesContext';

const animatedComponents = makeAnimated();

const UseIndexes = ({ chosenIndexes, setChosenIndexes }) => {
  const { selectedCourses } = useContext(SelectedCoursesContext);
  const [courseIndexes, setCourseIndexes] = useState([]);
  // const [chosenIndexes, setChosenIndexes] = useState({});

  useEffect(() => {
    async function getIndexes() {
      const courseIndexes = [];
      let courses = await fetchCourses(selectedCourses);
      courses.forEach(course => {
        let indexNos = [];
        course.indexes.forEach(index => indexNos.push(index.indexNo));
        courseIndexes.push({
          courseCode: course.courseCode,
          indexNos: indexNos,
        });
      });
      setCourseIndexes(courseIndexes);
    }
    getIndexes();

    // create object of courseCodes, each courseCode having an array of selected indexes
    courseIndexes.forEach(course => {
      chosenIndexes[course.courseCode] = [];
    })
  }, [selectedCourses]);

  return (
    <Form>
      {courseIndexes && courseIndexes.length !== 0 ? courseIndexes.map(course => {
        return (
          <SelectForm course={course} chosenIndexes={chosenIndexes} setChosenIndexes={setChosenIndexes}/>
        )
      })
      :
      <span>You haven't selected any modules!</span>
      }
    </Form>
  )
}

const SelectForm = ({ course, chosenIndexes, setChosenIndexes }) => {
  const options = [];
  course.indexNos.forEach(indexNo => options.push({ label: indexNo, value: indexNo }));

  const handleSelectChange = (selected) => {
    // selected is an array of objects { label, value }
    const indexes = [];
    selected.forEach(obj => indexes.push(Object.values(obj)[0])); // Object.values returns an array even if there's only one value in the object
    const temp = {...chosenIndexes};
    temp[course.courseCode] = indexes;
    setChosenIndexes(temp);
  }

  return (
    <Form.Group as={Col} className="mb-3" controlId={course.courseCode}>
      <Form.Label>Use the following indexes for <strong>{course.courseCode}</strong>:</Form.Label>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={options}
        onChange={handleSelectChange}
      />
    </Form.Group>
  )
}

export default UseIndexes;