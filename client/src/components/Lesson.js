import React from 'react';

function Lesson(props) {
    return (
        <div className="lessonStyle" style = {{marginLeft: props.marginLeft, width: props.width }}>
            {`${props.courseCode} ${props.type} ${props.group} ${props.venue} ${props.teachingWeeks}`}
        </div>     
    );
  }
  export default Lesson;