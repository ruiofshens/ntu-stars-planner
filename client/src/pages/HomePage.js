import React from 'react';

import Timetable from '../components/Timetable';
import CourseOverview from '../components/CourseOverview';

function HomePage() {
  return (
    <div className="px-3">
      <div className="container-fluid">
        <Timetable/>
      </div>
      <hr/>
      <div className="row">
        <div className="col-10">
          <h5>Courses Overview</h5>
          <CourseOverview/>
        </div>
        <div className="col-2 d-grid gap-3">
          <button type="button" className="btn btn-outline-primary">Reselect Modules</button>
          <hr/>
          <button type="button" className="btn btn-outline-primary">Download Timetable</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;