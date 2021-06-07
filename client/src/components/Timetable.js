import React from 'react';

//TODO:  reduce code repetition
function Timetable() {
    return (
        <>
        <div className="row px-5">
          <time className="col-sm fw-bold">08:00</time>
          <time className="col-sm fw-bold">09:00</time>
          <time className="col-sm fw-bold">10:00</time>
          <time className="col-sm fw-bold">11:00</time>
          <time className="col-sm fw-bold">12:00</time>
          <time className="col-sm fw-bold">13:00</time>
          <time className="col-sm fw-bold">14:00</time>
          <time className="col-sm fw-bold">15:00</time>
          <time className="col-sm fw-bold">16:00</time>
          <time className="col-sm fw-bold">17:00</time>
          <time className="col-sm fw-bold">18:00</time>
        </div>
        <div className="row">
          <div className="col list-group-item dayColor fw-bold">Mon</div>
          <TimetableRow/>
          </div>
        <div className="row">
          <div className="col list-group-item dayColor fw-bold">Tue</div>
          <TimetableRow/>
        </div>
        <div className="row">
          <div className="col list-group-item dayColor fw-bold">Wed</div>
          <TimetableRow/>
        </div>
        <div className="row">
          <div className="col list-group-item dayColor fw-bold">Thu</div>
          <TimetableRow/>
        </div>
        <div className="row">
          <div className="col list-group-item dayColor fw-bold">Fri</div>
          <TimetableRow/>
        </div>
        <div className="row">
          <div className="col list-group-item dayColor fw-bold">Sat</div>
          <TimetableRow/>
        </div>
        </>
    );
  }
  
  // Contains the cells for each day as a row, excluding the day itself
  function TimetableRow() {
    return (
      <>
        <div className="col list-group-item"></div>
        <div className="col list-group-item altColor"></div>
        <div className="col list-group-item"></div>
        <div className="col list-group-item altColor"></div>
        <div className="col list-group-item"></div>
        <div className="col list-group-item altColor"></div>
        <div className="col list-group-item"></div>
        <div className="col list-group-item altColor"></div>
        <div className="col list-group-item"></div>
        <div className="col list-group-item altColor"></div>
        <div className="col list-group-item"></div>
      </>
    );
  }
  export default Timetable;