import React, { createContext, useState } from 'react';

export const CoursesContext = createContext();

const CoursesContextProvider = (props) => {
    const [courses, setCourses] = useState([]);

    return (
        <CoursesContext.Provider value={{courses, setCourses}}>
            {props.children}
        </CoursesContext.Provider>
    );
}

export default CoursesContextProvider;
