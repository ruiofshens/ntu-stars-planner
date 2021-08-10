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
import FirstTimeContextProvider from './contexts/FirstTimeContext';

import { CoursesContext } from './contexts/CoursesContext';
import { fetchAllCourses, fetchAcadSem } from './services/DataRetriever';
import { useWindowDimension } from './services/useWindowDimension';

function App() {
  const { setCourses, setAcadSem } = React.useContext(CoursesContext);
  const [width, height] = useWindowDimension();

  React.useEffect(() => {
    async function retrieveAllCourses() {
      let acadSem = await fetchAcadSem();
      setAcadSem({ year: acadSem.year, sem: acadSem.sem });
      console.log(acadSem);
      let coursesJSON = await fetchAllCourses();
      setCourses(coursesJSON);
    }
    retrieveAllCourses();
  }, [])

  var prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("navbar").style.top = "0";
    } else {
      document.getElementById("navbar").style.top = "-55px";
    }
    prevScrollpos = currentScrollPos;
  }

  return (
    <Router>
      <SelectedCoursesContextProvider>
        <TimetablePlansContextProvider>
          <SavedPlansContextProvider>
            <CurrentPlanContextProvider>
              <ConstraintsContextProvider>
                <CustomisationContextProvider>
                  <FirstTimeContextProvider>
                    <Navbar 
                    id="navbar"
                    variant="light" 
                    fixed="top" 
                    className="sticky-nav d-flex justify-content-center">
                      <LinkContainer to="/">
                        <Navbar.Brand id="logo-stars-panel">
                          <span role="img" aria-label="star">⭐</span>
                          {' '}panel
                        </Navbar.Brand>
                      </LinkContainer>
                      <Nav 
                      // activeKey={window.location.pathname} 
                      className="nav-options">
                        <IndexLinkContainer to="/">
                          <Nav.Link id="nav-timetable">Timetable</Nav.Link>
                        </IndexLinkContainer>
                        <LinkContainer to="/courses">
                          <Nav.Link id="nav-courses">Courses</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/settings">
                          <Nav.Link id="nav-settings">Settings</Nav.Link>
                        </LinkContainer>
                      </Nav>
                    </Navbar>

                    <Switch>
                      <Route exact path="/" component={TimetablePage}/>
                      <Route path="/courses" component={CourseSelectionPage}/>
                      <Route path="/settings" component={SettingsPage}/>
                    </Switch>
                  </FirstTimeContextProvider>
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