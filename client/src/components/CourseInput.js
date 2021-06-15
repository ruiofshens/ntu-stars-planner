import React, { useState, useContext } from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';

import { SelectedCoursesContext } from '../contexts/SelectedCoursesContext';

function CourseInput(props) {
    
    /* input -> Variable accessible by both Button and FormControl components
    setInput -> For Button  to delete entered course code in FormControl
    removeSelection -> For Button to remove course from list of selected courses  */
    const { removeSelection } = useContext(SelectedCoursesContext);
    const [input, setInput] = useState("");

    console.log(props.course);
    if (input !== props.course) {
        setInput(props.course);
    }

    return (
        <InputGroup className="mb-3">
            <Button 
                variant="outline-secondary" 
                id="selection1"
                onClick={()=> {
                    removeSelection(props.index);
                }}
            >
                -
            </Button>
            <FormControl
                aria-label="selection-1"
                aria-describedby="selection-1"
                // inputRef={ref => { this.myInput = ref; }}
                value={input}
            />
        </InputGroup>
    );
  }
  
  export default CourseInput;