import React, { createContext, useState } from 'react';

// Constraints saved by the user
export const SavedConstraintsContext = createContext();

const PLANS_COUNT = 3;

const SavedConstraintsContextProvider = (props) => {
    let freeTimes = new Array(PLANS_COUNT);
    for (let i=0; i<PLANS_COUNT; i++) {
        let freeTime = localStorage.getItem(`saved-freeTimes-${i+1}`);
        if (freeTime) freeTimes[i] = JSON.parse(freeTime);
    }

    const [savedFreeTimes, setSavedFreeTimes] = useState({freeTimes});

    return (
        <SavedConstraintsContext.Provider value={{savedFreeTimes, setSavedFreeTimes}}>
            {props.children}
        </SavedConstraintsContext.Provider>
    );
}

export default SavedConstraintsContextProvider;
