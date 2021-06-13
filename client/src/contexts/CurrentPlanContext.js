import React, { createContext, useState } from 'react';

// Current plan out of the array of valid timetable plans sent by server
export const CurrentPlanContext = createContext();

const CurrentPlanContextProvider = (props) => {
    const [currentPlan, setCurrentPlan] = useState([]);

    return (
        <CurrentPlanContext.Provider value={{currentPlan, setCurrentPlan}}>
            {props.children}
        </CurrentPlanContext.Provider>
    );
}

export default CurrentPlanContextProvider;
