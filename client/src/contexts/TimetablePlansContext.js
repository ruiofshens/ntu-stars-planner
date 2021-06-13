import React, { createContext, useState } from 'react';

// All timetable plans that are viable based on list of selected courses
export const TimetablePlansContext = createContext();

const TimetablePlansContextProvider = (props) => {
    const [timetablePlans, setTimetablePlans] = useState([]);

    return (
        <TimetablePlansContext.Provider value={{timetablePlans, setTimetablePlans}}>
            {props.children}
        </TimetablePlansContext.Provider>
    );
}

export default TimetablePlansContextProvider;
