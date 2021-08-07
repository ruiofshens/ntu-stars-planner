import React, { useState, useContext } from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';

import { SelectedCoursesContext } from '../contexts/SelectedCoursesContext';

function CourseInput(props) {
    
    const { removeSelection } = useContext(SelectedCoursesContext);
    const [input, setInput] = useState("");

    if (input !== props.course) {
        setInput(props.course);
    }

    return (
        <InputGroup className="mb-3">
            <Button 
                variant="outline-secondary" 
                id="selection1"
                size="sm"
                onClick={()=> {
                    removeSelection(props.index);
                }}
            >
                -
            </Button>
            <FormControl
                aria-label="selection-1"
                aria-describedby="selection-1"
                size="sm"
                // inputRef={ref => { this.myInput = ref; }}
                value={input}
                readOnly
            />
        </InputGroup>
    );
  }
  
  export default CourseInput;