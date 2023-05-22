import React, { createContext, useState } from 'react';

// Plans saved by the user
export const SavedPlansContext = createContext();

const PLANS_COUNT = 3;

const SavedPlansContextProvider = (props) => {
    let plans = new Array(PLANS_COUNT);
    for (let i=0; i<PLANS_COUNT; i++) {
        let plan = localStorage.getItem(`saved-plans-${i+1}`);
        if (plan) plans[i] = JSON.parse(plan);
    }

    const [savedPlans, setSavedPlans] = useState({plans, currentIndex: -1});

    return (
        <SavedPlansContext.Provider value={{savedPlans, setSavedPlans}}>
            {props.children}
        </SavedPlansContext.Provider>
    );
}

export default SavedPlansContextProvider;
