import React, { useState, useContext, useEffect } from 'react';

import { Col, Form } from 'react-bootstrap';
import Select from 'react-select'; 
import makeAnimated from 'react-select/animated'

import { fetchVacanciesAndWaitlist } from '../../services/DataRetriever';
import { SelectedCoursesContext } from '../../contexts/SelectedCoursesContext';
import { ConstraintsContext } from '../../contexts/ConstraintsContext';
import { CustomisationContext } from '../../contexts/CustomisationContext';
import { CoursesContext } from '../../contexts/CoursesContext';

const animatedComponents = makeAnimated();

const UseIndexes = () => {
  const { courses } = useContext(CoursesContext);
  const { selectedCourses } = useContext(SelectedCoursesContext);
  const [courseIndexes, setCourseIndexes] = useState([]);
  
  const { chosenIndexes, setChosenIndexes } = useContext(ConstraintsContext);
  const { customOptions } = useContext(CustomisationContext);

  useEffect(() => {
    async function getIndexes() {
      const courseIndexes = [];
      const courseCodes = selectedCourses.filter(selected => selected);
      if (courseCodes.length !== 0) { // no courses selected yet     
        let temp = await fetchVacanciesAndWaitlist(courseCodes[0]);
        if (temp[0].vacancies !== "NA") {
          for (let i=0; i<courseCodes.length; i++) {
            let indexes = await fetchVacanciesAndWaitlist(courseCodes[i]);
            courseIndexes.push({ courseCode: courseCodes[i], indexes });
          }
        }
      } else {
        courses.forEach(course => {
          if (courseCodes.includes(course.courseCode)) {
            let indexes = [];
            course.indexes.forEach(index => indexes.push({indexNo: index.indexNo, vacancies: "NA", waitlistLength: "NA"}));
            courseIndexes.push({
              courseCode: course.courseCode,
              indexes: indexes,
            })
          }
        });
      }
      // create object of courseCodes, each courseCode having an array of selected indexes
      // if it hasn't been created already
      courseCodes.forEach(course => {
        if (course && !chosenIndexes[course]) chosenIndexes[course] = [];
      })

      setCourseIndexes(courseIndexes);      
    }
    
    getIndexes();
  }, [selectedCourses]);

  return (
    <Form>
      {courseIndexes && courseIndexes.length !== 0 ? courseIndexes.map(course => {
        return (
          <SelectForm course={course} chosenIndexes={chosenIndexes} setChosenIndexes={setChosenIndexes} customOptions={customOptions}/>
        )
      })
      :
      <span>You haven't selected any modules!</span>
      }
    </Form>
  )
}

const SelectForm = ({ course, chosenIndexes, setChosenIndexes, customOptions }) => {
  const options = [];
  course.indexes.forEach(index => options.push({ label: `${index.indexNo}/${index.vacancies}/${index.waitlistLength}`, value: index.indexNo }));
  
  const pastSelected = options.filter(option => chosenIndexes[course.courseCode].includes(option.value));

  const handleSelectChange = (selected) => {
    // selected is an array of objects { label, value }
    const indexes = [];
    selected.forEach(obj => indexes.push(obj.value)); 
    const temp = {...chosenIndexes};
    temp[course.courseCode] = indexes;
    setChosenIndexes(temp); 
    console.log(temp);
  }

  // styling for Select
  let backgroundColor = customOptions.displaySetting === "lightMode" ? "white": "#e9ecef";
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: "black",
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor,
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      backgroundColor,
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      backgroundColor,
    })
  }

  return (
    <Form.Group as={Col} className="mb-3" controlId={course.courseCode}>
      <Form.Label>Use the following indexes for <strong>{course.courseCode}</strong>:</Form.Label>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={options}
        defaultValue={pastSelected}
        onChange={handleSelectChange}
        styles={customStyles}
      />
    </Form.Group>
  )
}

export default UseIndexes;