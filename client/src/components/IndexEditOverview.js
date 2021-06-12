import React, { useContext } from 'react';

import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

import { SelectedCoursesContext } from '../contexts/SelectedCoursesContext';

// TODO: Static data for now, to make dynamic
function IndexEditOverview() {

    //Consume context for currently selected courses
    const { selectedCourses } = useContext(SelectedCoursesContext);

  //TODO: Update list with context 
    return (
        <Table striped hover size="sm">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Index/Waitlist/Vacancy</th>
                <th scope="col">Course Code and Name</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">1</th>
                <td>
                    <Form className="d-flex">
                        <Form.Control size="sm" as="select">
                            <option>10118/0/12</option>
                            <option>10119/0/8</option>
                            <option>10120/1/0</option>
                        </Form.Control>
                    </Form>
                </td>
                <td>CZ2001 Algorithms</td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>
                    <Form className="d-flex">
                        <Form.Control size="sm" as="select">
                            <option>10482/1/0</option>
                            <option>10482/0/0</option>
                            <option>10482/2/1</option>
                        </Form.Control>
                    </Form>
                </td>
                <td>CZ2002 Intro To Object-Oriented Programming</td>
            </tr>
            </tbody>
        </Table>
    );
}
  
  export default IndexEditOverview;