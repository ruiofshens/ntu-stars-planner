import React, { useState } from 'react';

import { Row, Col, Form, Button, Table } from 'react-bootstrap';

const generateTimeSlots = () => {
  const timeslots = []
  for (let hour=8; hour < 23; hour++) {
    timeslots.push(`${hour}:00`);
    timeslots.push(`${hour}:30`);
  }
  timeslots.push("23:00");
  return timeslots;
}

const FreeHours = () => {
  const [freeHours, setFreeHours] = useState([]);
  const [day, setDay] = useState("Monday");
  const [from, setFrom] = useState("8:00");
  const [to, setTo] = useState("8:30");
  const [entireDay, setEntireDay] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (entireDay) {
      setFreeHours([...freeHours, { day, hours: "Entire Day" }]);
    } else {
      const fromObj = new Date(`January 1 2021, ${from}`);
      const toObj = new Date(`January 1 2021, ${to}`);
      if (fromObj > toObj) {
        console.log("Temporary error log - to cannot be before from");
        return;
      }
      setFreeHours([...freeHours, { day, hours: `${from}-${to}` }]);
    }
  }

  const handleDelete = (e) => {
    setFreeHours(freeHours.filter((hours, i) => i !== parseInt(e.target.id)));
  }

  return (
    <>
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} controlId="free-day">
        <Form.Label column sm="2">
          Day
        </Form.Label>
        <Col sm="8">
          <Form.Control as={"select"} onChange={(e) => setDay(e.target.value) }>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
          </Form.Control>
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="free-from">
        <Form.Label column sm="2">
          From
        </Form.Label>
        <Col sm="8">
          <Form.Control as={"select"} onChange={(e) => setFrom(e.target.value)} disabled={entireDay}>
            {generateTimeSlots().slice(0, -1).map((slot,i) => <option key={i} value={slot}>{slot}</option>)}
          </Form.Control>
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="free-to">
        <Form.Label column sm="2">
          To
        </Form.Label>
        <Col sm="8">
          <Form.Control as={"select"} onChange={(e) => setTo(e.target.value)} disabled={entireDay}>
            {generateTimeSlots().slice(1).map((slot,i) => <option key={i} value={slot}>{slot}</option>)}
          </Form.Control>
        </Col>
      </Form.Group>
      <Form.Group>
        <Form.Check type="checkbox" label="Entire day" id="choose-entire-day" onChange={(e) => setEntireDay(!entireDay)}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Free Hours
      </Button>
    </Form>
    <br></br>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Day</th>
          <th>Free Hours</th>
        </tr>
      </thead>
      <tbody>
        {freeHours.map((hours, i) => (
          <tr>
            <td>{hours.day}</td>
            <td>{hours.hours}</td>
            <td>
              <Button variant="danger" type="button" className="bi bi-x-circle-fill" id={i} onClick={handleDelete}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </>
  )
}

export default FreeHours;