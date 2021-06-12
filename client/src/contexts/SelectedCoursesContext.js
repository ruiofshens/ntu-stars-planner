import React, { createContext, useState } from 'react';

// Selected courses refer to the courses that are currently selected for planning of timetable
export const SelectedCoursesContext = createContext();

const SelectedCoursesContextProvider = (props) => {
    const [selectedCourses, setSelectedCourses] = useState([
        {courseCode: "CZ1103", courseName:"Intro To Comput Thinking & Pro", AUs: 3},
        {courseCode: "CZ1104", courseName:"Linear Algebra for Computing", AUs: 3},
        {courseCode: "CZ1105", courseName:"Digital Logic", AUs: 3},
    ]);
    return (
        <SelectedCoursesContext.Provider value={{selectedCourses}}>
            {props.children}
        </SelectedCoursesContext.Provider>
    );
}

export default SelectedCoursesContextProvider;
