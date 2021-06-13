import React, { useState } from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';

function CourseInput(props) {
    
    const [input, setInput] = useState (props.course);

    console.log(props[0]);

    return (
            <InputGroup className="mb-3">
                <Button variant="outline-secondary" id="selection1"
                onClick={()=>setInput("")}>-</Button>
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