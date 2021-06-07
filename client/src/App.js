import './App.css';

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import logo from './icons/logo.png';
import HomePage from './pages/HomePage.js';
import CourseSelectionPage from './pages/CourseSelectionPage.js';
import SettingsPage from './pages/SettingsPage.js';
import AboutUsPage from './pages/AboutUsPage.js';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


function App() {
  return (
        <Router>

          <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="sticky-nav">

            <LinkContainer to="/">
              <Navbar.Brand>
                <img
                  src={logo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="NTU Stars logo"
                />{' '}
                NTU Stars V2
              </Navbar.Brand>
            </LinkContainer>

            <Nav activeKey={window.location.pathname} className="ml-auto">
              <LinkContainer to="/">
                <Nav.Link>Timetable</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/courses">
                <Nav.Link>Courses</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/settings">
                <Nav.Link>Settings</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar>

          <br />

          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/courses" component={CourseSelectionPage}/>
            <Route path="/settings" component={SettingsPage}/>
          </Switch>

        </Router>
  );
}

export default App;