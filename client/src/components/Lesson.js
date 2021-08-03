import React from 'react';
import Container from 'react-bootstrap/Container';

function Lesson(props) {

    return (
        // <div className="lessonText timetableRow ">
        //     CZ3002 TUT TS8 SWLAB3 Wk2,4,6,8,10,12
        // </div>     

        // <div className=" border border-dark lessonText timetableRow" 
        //      style={{backgroundColor: props.color, width: props.width, height: props.height,
        //              transform: `translate(${props.offset}, ${props.verticalOffset})` }}>
        //     {`${props.courseCode} ${props.type} ${props.group} ${props.venue} ${props.teachingWeeks}`}
        // </div>  
        <Container className="border border-dark lessonText timetableRow px-1" 
             style={{backgroundColor: props.color, width: props.width, fontSize: "0.80vw", color: "black",
                     transform: `translate(${props.offset}`, position: props.position }}>
            {`${props.courseCode} ${props.type} ${props.group} ${props.venue} ${props.teachingWeeks}`}
        </Container>
    );
  }
  export default Lesson;