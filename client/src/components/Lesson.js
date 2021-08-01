import React from 'react';

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
        <div className="border border-dark lessonText timetableRow" 
             style={{backgroundColor: props.color, width: props.width, fontSize: "0.80vw",
                     transform: `translate(${props.offset}`, position: props.position }}>
            {`${props.courseCode} ${props.type} ${props.group} ${props.venue} ${props.teachingWeeks}`}
        </div>
    );
  }
  export default Lesson;