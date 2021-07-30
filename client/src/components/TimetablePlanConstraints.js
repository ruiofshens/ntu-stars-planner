import React from 'react';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Accordion from 'react-bootstrap/Accordion';

import FreeTimes from '../components/FreeTimes';
import UseIndexes from '../components/UseIndexes';
import MiscConstraints from '../components/MiscConstraints';

function TimetablePlanConstraints() {

    return (
        <Accordion defaultActiveKey="advanced-settings">
          <Accordion.Item eventKey="advanced-settings">
            <Accordion.Header><strong>Advanced Settings</strong></Accordion.Header>
            <Accordion.Body>
              <Tabs defaultActiveKey="use-indexes" id="adjust-rules" className="mb-3">
                <Tab eventKey="use-indexes" title="Use Indexes">
                  <UseIndexes />
                </Tab>
                <Tab eventKey="free-times" title="Free Times">
                  <FreeTimes />
                </Tab>
                <Tab eventKey="misc-constraints" title="Misc.">
                  <MiscConstraints />
                </Tab>
              </Tabs>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
    );
}

export default TimetablePlanConstraints;