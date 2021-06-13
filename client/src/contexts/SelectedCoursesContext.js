import React, { createContext, useState } from 'react';

// Selected courses refer to the courses that are currently selected for planning of timetable
export const SelectedCoursesContext = createContext();

const SelectedCoursesContextProvider = (props) => {
    const [selectedCourses, setSelectedCourses] = useState([]);

    const addSelection = (courseCode, courseName, AUs) => {
        setSelectedCourses([...selectedCourses, {courseCode, courseName, AUs}]);
    };

    const removeSelection = (courseCode) => {
        setSelectedCourses(selectedCourses.filter(course => course.courseCode !== courseCode));
    };

    return (
        <SelectedCoursesContext.Provider value={{selectedCourses, addSelection, removeSelection}}>
            {props.children}
        </SelectedCoursesContext.Provider>
    );
}

export default SelectedCoursesContextProvider;
