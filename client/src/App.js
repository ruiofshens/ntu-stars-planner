import './App.css';

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

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
import CustomisationContextProvider from './contexts/CustomisationContext';

import { CoursesContext } from './contexts/CoursesContext';
import { fetchAllCourses } from './services/DataRetriever';

function App() {
  const { setCourses } = React.useContext(CoursesContext);

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
                <CustomisationContextProvider>
                  <Navbar 
                  variant="light" 
                  fixed="top" 
                  className="sticky-nav d-flex justify-content-center">
                    <LinkContainer to="/">
                      <Navbar.Brand>
                        <span role="img" aria-label="star">⭐</span>
                        {' '}planner
                      </Navbar.Brand>
                    </LinkContainer>
                    <Nav 
                    // activeKey={window.location.pathname} 
                    className="nav-options">
                      <IndexLinkContainer to="/">
                        <Nav.Link>Timetable</Nav.Link>
                      </IndexLinkContainer>
                      <LinkContainer to="/courses">
                        <Nav.Link>Courses</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/settings">
                        <Nav.Link>Settings</Nav.Link>
                      </LinkContainer>
                    </Nav>
                  </Navbar>

                  <Switch>
                    <Route exact path="/" component={TimetablePage}/>
                    <Route path="/courses" component={CourseSelectionPage}/>
                    <Route path="/settings" component={SettingsPage}/>
                  </Switch>
                </CustomisationContextProvider>
              </ConstraintsContextProvider>
            </CurrentPlanContextProvider>
          </SavedPlansContextProvider>
        </TimetablePlansContextProvider>
      </SelectedCoursesContextProvider>
    </Router>
  );
}

export default App;