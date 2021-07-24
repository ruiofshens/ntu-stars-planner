import React, { useState, useContext, useEffect } from 'react';

import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import Select from 'react-select'; 
import makeAnimated from 'react-select/animated'

import { fetchCourses } from '../services/DataRetriever';
import { SelectedCoursesContext } from '../contexts/SelectedCoursesContext';

const animatedComponents = makeAnimated();

const getIndexes = async (courseCodes) => {
  const courseIndexes = [];
  let courses = await fetchCourses(courseCodes);
  courses.forEach(course => {
    let indexNos = [];
    course.indexes.forEach(index => indexNos.push(index.indexNo));
    courseIndexes.push({
      courseCode: course.courseCode,
      indexNos: indexNos,
    });
  });
  return courseIndexes;
}


const ConstraintRules = () => {
  const { selectedCourses } = useContext(SelectedCoursesContext);
  const [courseIndexes, setCourseIndexes] = useState([]);
  const [chosenIndexes, setChosenIndexes] = useState({});
  const [noBackToBack, setNoBackToBack] = useState(false);

  useEffect(() => {
    async function callGetIndexes() {
      let indexes = await getIndexes(selectedCourses);
      setCourseIndexes(indexes);
    }
    callGetIndexes();

    // create object of courseCodes, each courseCode having an array of selected indexes
    courseIndexes.forEach(course => {
      chosenIndexes[course.courseCode] = [];
    })
    console.log(chosenIndexes);
  }, [])

  // const handleSelectChange = (selected) => {
  //   // selected is an array of selected options, but each Select componenth as its own options 
  //   // and we are trying to share the state chosenIndexes among all the Select components.
  //   // So we handle by merging the chosenIndexes array and selected array
  //   // But this assumes all indexes are unique even across the different schools
  //   // nvm can't, cannot remove indexes
  //   setChosenIndexes(chosenIndexes.concat(selected.filter(index => chosenIndexes.indexOf(index) < 0)));
  //   console.log(chosenIndexes);
  // }

  return (
    <Form>
      {courseIndexes && courseIndexes.length !== 0 ? courseIndexes.map(course => {
        
        return (
          <SelectForm course={course} chosenIndexes={chosenIndexes} setChosenIndexes={setChosenIndexes}/>
        )
      })
      :
      <div>You haven't selected any modules!</div>
      }
      <Form.Group as={Col} className="position-relative mb-3">
        <Form.Check
          name="no-b2b"
          label="No back-to-back lessons"
          onChange={() => setNoBackToBack(!noBackToBack)}
          id="no-b2b"
        />
      </Form.Group>
      <Button
        onClick={() => console.log(chosenIndexes)}
      >
        Temp
      </Button>
    </Form>
  )
}

const SelectForm = ({ course, chosenIndexes, setChosenIndexes }) => {

  const options = [];
  course.indexNos.forEach(indexNo => options.push({ label: indexNo, value: indexNo }));

  const handleSelectChange = (selected) => {
    // selected is an array of objects { label, value }
    const indexes = [];
    selected.forEach(obj => indexes.push(Object.values(obj)[0])) // Object.values returns an array even if there's only one value in the object
    const temp = {...chosenIndexes}
    temp[course.courseCode] = indexes;
    setChosenIndexes(temp)
  }

  return (
    <Form.Group as={Col} className="mb-3" controlId={course.courseCode}>
      <Form.Label>{course.courseCode}</Form.Label>
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

export default ConstraintRules;