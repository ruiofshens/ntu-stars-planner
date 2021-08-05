import React, { useState, useContext } from 'react';

import { Table } from 'react-bootstrap';

import { ConstraintsContext } from '../contexts/ConstraintsContext';
import { CustomisationContext } from '../contexts/CustomisationContext';

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
const FreeTimes = () => {
  const [freeDays, setFreeDays] = useState(Array(6).fill(false)); // used to enable/disable checkboxes
  const [oldFreeTimes, setOldFreeTimes] = useState([]); // save checked free times in case user wants to uncheck free day
  const { customOptions } = useContext(CustomisationContext);

  // states for advanced settings
  const { freeTimes, setFreeTimes } = useContext(ConstraintsContext);

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
    freeDays[index] = !freeDays[index];
    if (e.target.checked) {
      freeTimes.push(e.target.value); // without this oldFreeTimes will not have a record of this free day, and unchecking another free day will remove this free day
      setOldFreeTimes(freeTimes);
      // remove all timeslots from checked day
      const newFreeTimes = freeTimes.filter(timeSlots => timeSlots.slice(0, 2) !== e.target.value.slice(0, 2))
      newFreeTimes.push(e.target.value);
      setFreeTimes(newFreeTimes);
    } else {
      let temp = (oldFreeTimes.filter(timeSlot => timeSlot !== e.target.value)); // oldFreeTimes have record of this day, so need to remove from the array
      // need to use temp because setting state has a delay
      setOldFreeTimes(temp) 
      setFreeTimes(temp); 
    }
  }
  
  return (
    <Table responsive striped bordered hover 
    className="text-center align-middle"
    variant={customOptions.displaySetting === "lightMode" ? "light" : "dark"}> 
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
          <tr key={i}>
            {i !== 0 ?
              <>
                <td>{timeSlot}</td>
                {Array(6).fill().map((val, j) => {
                  let id = `${j}-${timeSlot}`;
                  return (
                    <td key={j}>
                      <input type="checkbox" id={id} value={id} onChange={handleChecked} disabled={freeDays[j]} defaultChecked={freeTimes.includes(id)}/>
                    </td>
                  )
                })}
              </>
            :
              <>
                <td>Free Day!</td>
                {Array(6).fill().map((val, j) => {
                  let id = `${j}-free-day`;
                  let freeDayChecked = freeTimes.includes(id);
                  if (freeDayChecked) {
                    freeDays[j] = !freeDays[j];
                  }
                  return (
                    <td key={j}>
                      <input type="checkbox" id={id} value={id} onChange={handleFreeDayChecked} defaultChecked={freeDayChecked} />
                    </td>
                  )
                })}
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