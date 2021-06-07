import React from 'react';

import CourseInputGroup from '../components/CourseInputGroup'

function CourseSelectionPage() {
  return (
    <div className="row vh-100">
      <div className="col-md-2 d-none d-md-block bg-light">
        <h4>Enter Course Codes!</h4>
        <hr/>
        <CourseInputGroup/>
        <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
        <label className="form-check-label" htmlFor="exampleCheck1">Consider Vacancies</label>
        <hr/>
        <button type="button" className="btn btn-primary">Plan Timetable!</button>
        
      </div>

      <div className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4 bg-white">
      <h2>The courses retrieved should be inserted here!</h2>
      <hr/>
      <hr/>
      <button type="button" className="btn btn-primary">Retrieve Courses!</button>
        
      </div>
    </div>
  );
}

export default CourseSelectionPage;