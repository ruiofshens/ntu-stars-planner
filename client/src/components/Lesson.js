import React from 'react';
import Container from 'react-bootstrap/Container';

function Lesson(props) {
  console.log(props.clashed);
  const style = {
    backgroundColor: props.color, 
    width: props.width, 
    fontSize: "0.80vw", 
    color: !props.clashed ? "black" : "red",
    fontWeight: !props.clashed ? "normal" : "bold",
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