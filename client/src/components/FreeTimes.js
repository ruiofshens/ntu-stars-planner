import React, { useState } from 'react';

import { Row, Col, Form, Button, Table } from 'react-bootstrap';

const generateTimeSlots = () => {
  const timeslots = ["freeDay"]
  for (let hour=8; hour < 23; hour++) {
    timeslots.push(hour < 10 ? `0${hour}:00` : `${hour}:00`);
    timeslots.push(hour < 10 ? `0${hour}:30` : `${hour}:30`);
  }
  return timeslots;
}

// - Free hours probably a table of hours vs days and have checkboxes in each cell
// - That's a rough implementation, subsequently to touch up can consider having a range bar-like thing where users can select a range and add a new range (kind of like timelines in video editing i guess)
const FreeTimes = ({ freeTimes, setFreeTimes }) => {
  // const [freeTimes, setFreeTimes] = useState([]);
  const [freeDay, setFreeDay] = useState(Array(6).fill(false));
  const [oldFreeTimes, setOldFreeTimes] = useState([]); // save checked free times in case user wants to uncheck free day

  const handleChecked = (e) => {
    if (e.target.checked) {
      freeTimes.push(e.target.value);
    } else {
      let index = freeTimes.indexOf(e.target.value);
      if (index !== -1) {
        freeTimes.splice(index, 1);
      }
    }
  }

  const handleFreeDayChecked = (e) => {
    let index = parseInt(e.target.value[0]);
    freeDay[index] = !freeDay[index];
    if (e.target.checked) {
      setOldFreeTimes(freeTimes);
      setFreeTimes([e.target.value]);
    } else {
      setFreeTimes(oldFreeTimes);
    }
  }
  
  return (
    <Table striped bordered hover className="text-center align-middle"> 
      <thead>
        <tr>
          <th>Time</th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
        </tr>
      </thead>
      <tbody>
        {generateTimeSlots().map((timeSlot, i) => (
          <tr>
            {i !== 0 ?
              <>
                <td>{timeSlot}</td>
                {Array(6).fill().map((val, j) => (
                  <td><input type="checkbox" id={`${j}-${timeSlot}`} value={`${j}-${timeSlot}`} onChange={handleChecked} disabled={freeDay[j]}/></td>
                ))}
              </>
            :
              <>
                <td>Free Day!</td>
                {Array(6).fill().map((val, j) => (
                  <td><input type="checkbox" id={`${j}-free-day`} value={`${j}-free-day`} onChange={handleFreeDayChecked}/></td>
                ))}
              </>
            }
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

// const generateTimeSlots = () => {
//   const timeslots = []
//   for (let hour=8; hour < 23; hour++) {
//     timeslots.push(`${hour}:00`);
//     timeslots.push(`${hour}:30`);
//   }
//   timeslots.push("23:00");
//   return timeslots;
// }

// const FreeHours = () => {
//   const [freeHours, setFreeHours] = useState([]);
//   const [day, setDay] = useState("Monday");
//   const [from, setFrom] = useState("8:00");
//   const [to, setTo] = useState("8:30");
//   const [entireDay, setEntireDay] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (entireDay) {
//       setFreeHours([...freeHours, { day, hours: "Entire Day" }]);
//     } else {
//       const fromObj = new Date(`January 1 2021, ${from}`);
//       const toObj = new Date(`January 1 2021, ${to}`);
//       if (fromObj > toObj) {
//         console.log("Temporary error log - to cannot be before from");
//         return;
//       }
//       setFreeHours([...freeHours, { day, hours: `${from}-${to}` }]);
//     }
//   }

//   const handleDelete = (e) => {
//     setFreeHours(freeHours.filter((hours, i) => i !== parseInt(e.target.id)));
//   }

//   return (
//     <>
//     <Form onSubmit={handleSubmit}>
//       <Form.Group as={Row} controlId="free-day">
//         <Form.Label column sm="2">
//           Day
//         </Form.Label>
//         <Col sm="8">
//           <Form.Control as={"select"} onChange={(e) => setDay(e.target.value) }>
//             <option value="Monday">Monday</option>
//             <option value="Tuesday">Tuesday</option>
//             <option value="Wednesday">Wednesday</option>
//             <option value="Thursday">Thursday</option>
//             <option value="Friday">Friday</option>
//             <option value="Saturday">Saturday</option>
//           </Form.Control>
//         </Col>
//       </Form.Group>
//       <Form.Group as={Row} controlId="free-from">
//         <Form.Label column sm="2">
//           From
//         </Form.Label>
//         <Col sm="8">
//           <Form.Control as={"select"} onChange={(e) => setFrom(e.target.value)} disabled={entireDay}>
//             {generateTimeSlots().slice(0, -1).map((slot,i) => <option key={i} value={slot}>{slot}</option>)}
//           </Form.Control>
//         </Col>
//       </Form.Group>
//       <Form.Group as={Row} controlId="free-to">
//         <Form.Label column sm="2">
//           To
//         </Form.Label>
//         <Col sm="8">
//           <Form.Control as={"select"} onChange={(e) => setTo(e.target.value)} disabled={entireDay}>
//             {generateTimeSlots().slice(1).map((slot,i) => <option key={i} value={slot}>{slot}</option>)}
//           </Form.Control>
//         </Col>
//       </Form.Group>
//       <Form.Group>
//         <Form.Check type="checkbox" label="Entire day" id="choose-entire-day" onChange={(e) => setEntireDay(!entireDay)}/>
//       </Form.Group>
//       <Button variant="primary" type="submit">
//         Add Free Hours
//       </Button>
//     </Form>
//     <br></br>
//     <Table striped bordered hover>
//       <thead>
//         <tr>
//           <th>Day</th>
//           <th>Free Hours</th>
//         </tr>
//       </thead>
//       <tbody>
//         {freeHours.map((hours, i) => (
//           <tr>
//             <td>{hours.day}</td>
//             <td>{hours.hours}</td>
//             <td>
//               <Button variant="danger" type="button" className="bi bi-x-circle-fill" id={i} onClick={handleDelete}>
//                 Delete
//               </Button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </Table>
//     </>
//   )
// }

export default FreeTimes;