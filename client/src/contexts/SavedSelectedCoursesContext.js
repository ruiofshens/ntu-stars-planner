import React, { createContext, useState } from 'react';

// Selected courses saved by the user
export const SavedSelectedCoursesContext = createContext();

const PLANS_COUNT = 3;

const SavedSelectedCoursesContextProvider = (props) => {
    let selectedCourses = new Array(PLANS_COUNT);
    for (let i=0; i<PLANS_COUNT; i++) {
        let selectedCourse = localStorage.getItem(`saved-selectedCourses-${i+1}`);
        if (selectedCourse) selectedCourses[i] = JSON.parse(selectedCourse);
    }

    const [savedSelectedCourses, setSavedSelectedCourses] = useState({selectedCourses});

    return (
        <SavedSelectedCoursesContext.Provider value={{savedSelectedCourses, setSavedSelectedCourses}}>
            {props.children}
        </SavedSelectedCoursesContext.Provider>
    );
}

export default SavedSelectedCoursesContextProvider;
