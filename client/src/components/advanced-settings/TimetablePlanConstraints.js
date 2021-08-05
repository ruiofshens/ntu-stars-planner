import React, { useContext } from 'react';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Accordion from 'react-bootstrap/Accordion';

import FreeTimes from './FreeTimes';
import UseIndexes from './UseIndexes';
import MiscConstraints from './MiscConstraints';

import { CustomisationContext } from '../../contexts/CustomisationContext';

function TimetablePlanConstraints() {

  const { customOptions } = useContext(CustomisationContext);

    return (
        <Accordion defaultActiveKey="advanced-settings">
          <Accordion.Item eventKey="advanced-settings" className={customOptions.displaySetting}>
            <Accordion.Header><strong>Advanced Settings</strong></Accordion.Header>
            <Accordion.Body>
              <Tabs className="tabs" variant="pills" defaultActiveKey="use-indexes" id="adjust-rules" className="mb-3">
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