import React from 'react';

import Table from 'react-bootstrap/Table';

// TODO: Static data for now, to make dynamic
function CourseOverview() {
    return (
        <Table striped hover size="sm">
          <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Index/Waitlist/Vacancy</th>
                <th scope="col">Course Code and Name</th>
                <th scope="col">AUs</th>
                <th scope="col">Exam Timing</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <th scope="row">1</th>
                <td>10118/0/12</td>
                <td>CZ2001 Algorithms</td>
                <td>3</td>
                <td>1 April 2022 1000 - 1200</td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>10482/1/0</td>
                <td>CZ2002 Intro To Object-Oriented Programming</td>
                <td>3</td>
                <td>-</td>
            </tr>
          </tbody>
        </Table>
    );
  }
  
  export default CourseOverview;