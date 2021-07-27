import React, { createContext, useState } from 'react';

export const SavedPlansContext = createContext();

const SavedPlansContextProvider = (props) => {
    const [savedPlans, setSavedPlans] = useState([]);

    return (
        <SavedPlansContext.Provider value={{savedPlans, setSavedPlans}}>
            {props.children}
        </SavedPlansContext.Provider>
    );
}

export default SavedPlansContextProvider;
