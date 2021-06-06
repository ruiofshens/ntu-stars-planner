import './App.css';

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import HomePage from './pages/HomePage.js';
import CourseSelectionPage from './pages/CourseSelectionPage.js';
import SettingsPage from './pages/SettingsPage.js';
import AboutUsPage from './pages/AboutUsPage.js';

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <div className="row vh-100">

          <nav className="col-md-2 d-none d-md-block bg-dark sidebar">
            <div className="sidebar-sticky">
              <ul className="nav nav-pills nav-fill flex-column">
                <li className="active nav-item">
                  <Link to="/" className="nav-link active" data-toggle="pill">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/course-selection" className="nav-link" data-toggle="pill">Course Selection</Link>
                </li>
                <li className="nav-item">
                  <Link to="/settings" className="nav-link" data-toggle="pill">Settings</Link>
                </li>
                <li className="nav-item">
                  <Link to="/about-us" className="nav-link" data-toggle="pill">About Us</Link>
                </li>
              </ul>
            </div>
          </nav>

          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4 bg-light">
            <Switch className="col-6 tab-content" id="tabContent">
              <Route exact path="/" className="tab-pane fade show active">
                <HomePage />
              </Route>
              <Route path="/course-selection" className="tab-pane fade">
                <CourseSelectionPage />
              </Route>
              <Route path="/settings" className="tab-pane fade">
                <SettingsPage />
              </Route>
              <Route path="/about-us" className="tab-pane fade">
                <AboutUsPage />
              </Route>
            </Switch>
          </main>
        
        </div>
      </div>
    </Router>
  );
}

export default App;