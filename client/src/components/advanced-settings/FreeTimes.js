import React, { useState, useContext } from 'react';

import { Table } from 'react-bootstrap';

import { ConstraintsContext } from '../../contexts/ConstraintsContext';
import { CustomisationContext } from '../../contexts/CustomisationContext';

const generateTimeSlots = () => {
  const timeslots = ["freeDay"];
  for (let hour=8; hour < 23; hour++) {
    timeslots.push(hour < 10 ? `0${hour}:00` : `${hour}:00`);
    timeslots.push(hour < 10 ? `0${hour}:30` : `${hour}:30`);
  }
  return timeslots;
}

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
                      <input 
                        type="checkbox" 
                        id={id} 
                        value={id} 
                        onChange={handleChecked} 
                        disabled={freeDays[j]} 
                        defaultChecked={freeTimes.includes(id)}
                      />
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
                      <input 
                        type="checkbox" 
                        id={id} 
                        value={id} 
                        onChange={handleFreeDayChecked} 
                        defaultChecked={freeDayChecked}  
                      />
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

export default FreeTimes;