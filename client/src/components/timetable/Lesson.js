import React from 'react';
import Container from 'react-bootstrap/Container';

function Lesson(props) {
  const style = {
    backgroundColor: props.color, 
    width: props.width, 
    color: !props.clashed ? "black" : "red",
    fontWeight: !props.clashed ? "normal" : "bold",
    borderRadius: "5px",
    transform: `translate(${props.offset}`, 
    position: props.position,
  }

  return (
    <Container className="border border-dark lessonText timetableRow px-1" style={style}>
      {`${props.courseCode} ${props.type} ${props.group} ${props.venue} ${props.teachingWeeks}`}
    </Container>
  );
}
export default Lesson;