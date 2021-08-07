import React, { createContext, useState } from 'react';

// Course information sent by the server
export const CoursesContext = createContext();

const CoursesContextProvider = (props) => {
    const [courses, setCourses] = useState([]);
    const [acadSem, setAcadSem] = useState(null);

    return (
        <CoursesContext.Provider value={{courses, setCourses, acadSem, setAcadSem}}>
            {props.children}
        </CoursesContext.Provider>
    );
}

export default CoursesContextProvider;
