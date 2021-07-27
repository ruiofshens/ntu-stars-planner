import './App.css';

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import logo from './icons/logo.png';
import TimetablePage from './pages/TimetablePage.js';
import CourseSelectionPage from './pages/CourseSelectionPage.js';
import SettingsPage from './pages/SettingsPage.js';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import SelectedCoursesContextProvider from './contexts/SelectedCoursesContext';
import TimetablePlansContextProvider from './contexts/TimetablePlansContext';
import CurrentPlanContextProvider from './contexts/CurrentPlanContext';
import SavedPlansContextProvider from './contexts/SavedPlansContext';
import ConstraintsContextProvider from './contexts/ConstraintsContext';

import { CoursesContext } from './contexts/CoursesContext';
import { fetchAllCourses } from './services/DataRetriever';

function App() {
  const { setCourses } = React.useContext(CoursesContext)

  React.useEffect(() => {
    async function retrieveAllCourses() {
      let coursesJSON = await fetchAllCourses();
      setCourses(coursesJSON);
    }
    retrieveAllCourses();
  }, [])

  return (
    <Router>
      <SelectedCoursesContextProvider>
        <TimetablePlansContextProvider>
          <SavedPlansContextProvider>
            <CurrentPlanContextProvider>
              <ConstraintsContextProvider>
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
                  <Route exact path="/" component={TimetablePage}/>
                  <Route path="/courses" component={CourseSelectionPage}/>
                  <Route path="/settings" component={SettingsPage}/>
                </Switch>
              </ConstraintsContextProvider>
            </CurrentPlanContextProvider>
          </SavedPlansContextProvider>
        </TimetablePlansContextProvider>
      </SelectedCoursesContextProvider>
    </Router>
  );
}

export default App;