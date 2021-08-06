import React, { createContext, useState } from 'react';

// Selected courses refer to the courses that are currently selected for planning of timetable
//Currently a course is represented by only a string (eg. "CZ2003"), might add more details if necessary
export const SelectedCoursesContext = createContext();

const SelectedCoursesContextProvider = (props) => {
    const [selectedCourses, setSelectedCourses] = useState(Array(7).fill(""));

    //Add selected course to current array of selected courses
    const addSelection = (courseCode) => {
        if (!selectedCourses.includes(courseCode)){
            let emptySlot = selectedCourses.indexOf("");
            setSelectedCourses([...selectedCourses.slice(0, emptySlot), courseCode, ...selectedCourses.slice(emptySlot+1)]);
        }
    };

    //Remove selected course to current array of selected courses
    const removeSelection = (index) => {
        setSelectedCourses([...selectedCourses.slice(0, index), "", ...selectedCourses.slice(index+1)]);
    };

    return (
        <SelectedCoursesContext.Provider value={{selectedCourses, setSelectedCourses, addSelection, removeSelection}}>
            {props.children}
        </SelectedCoursesContext.Provider>
    );
}

export default SelectedCoursesContextProvider;
