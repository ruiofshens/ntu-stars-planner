import React, { createContext, useState } from 'react';

// Selected courses refer to the courses that are currently selected for planning of timetable
//Currently a course is represented by only a string (eg. "CZ2003"), might add more details if necessary
export const SelectedCoursesContext = createContext();

const SelectedCoursesContextProvider = (props) => {
    const [selectedCourses, setSelectedCourses] = useState([]);

    //Add selected course to current array of selected courses
    const addSelection = (courseCode) => {
        setSelectedCourses([...selectedCourses, courseCode]);
    };

    /* const addSelection = (courseCode, courseName, AUs) => {
        setSelectedCourses([...selectedCourses, {courseCode, courseName, AUs}]);
    }; */

    //REmove selected course to current array of selected courses
    const removeSelection = (courseCode) => {
        setSelectedCourses(selectedCourses.filter(course => course !== courseCode));
    };

    return (
        <SelectedCoursesContext.Provider value={{selectedCourses, addSelection, removeSelection}}>
            {props.children}
        </SelectedCoursesContext.Provider>
    );
}

export default SelectedCoursesContextProvider;
