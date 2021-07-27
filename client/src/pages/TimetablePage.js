import React from 'react';

import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import Timetable from '../components/Timetable';
import CourseOverview from '../components/CourseOverview';
import IndexEditOverview from '../components/IndexEditOverview';
import SavedPlansOverview from '../components/SavedPlansOverview';


function TimetablePage() {

  return (
    <Container fluid className="px-0">
      <Timetable/>
      <Container fluid className ="pt-2">
          <Tabs defaultActiveKey="choose-plan" id="toggle-course-overview" className="mb-3">
            <Tab eventKey="choose-plan" title="Choose Plan">
              <CourseOverview/>
            </Tab>
            <Tab eventKey="edit-plan" title="Edit Plan">
              <IndexEditOverview/>
            </Tab>
            <Tab eventKey="save-plan" title="Save Plan">
              <SavedPlansOverview/>
            </Tab>
          </Tabs>
      </Container>
    </Container>
  );
}

export default TimetablePage;