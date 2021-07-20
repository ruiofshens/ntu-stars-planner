import React from 'react';

function Lesson(props) {
    console.log(props.offset)
    return (
        // <div className="lessonText timetableRow ">
        //     CZ3002 TUT TS8 SWLAB3 Wk2,4,6,8,10,12
        // </div>     
        //  style = {{marginLeft: props.marginLeft, width: props.width }}
        <div className=" border border-dark lessonText timetableRow" 
             style={{backgroundColor: props.color, width: props.width, height: props.height,
                     transform: `translate(${props.offset}, ${props.verticalOffset})` }}>
            {`${props.courseCode} ${props.type} ${props.group} ${props.venue} ${props.teachingWeeks}`}
        </div>  
        // <div className="lessonText timetableRow" style={{width: "6.4vw", transform: `translateX(5vw)`}}>
        //     CZ3002 TUT TS8 SWLAB3 Wk2,4,6,8,10,12
        // </div>  
    );
  }
  export default Lesson;