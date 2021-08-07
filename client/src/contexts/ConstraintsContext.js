import React, { createContext, useState } from 'react';

// Constraints set by user for generating of timetable plans
export const ConstraintsContext = createContext();

const ConstraintsContextProvider = (props) => {
    const [chosenIndexes, setChosenIndexes] = useState({});
    const [freeTimes, setFreeTimes] = useState([]);
    const [miscConstraints, setMiscConstraints] = useState({
        noBackToBack: false,
      });

    return (
        <ConstraintsContext.Provider value={{chosenIndexes, setChosenIndexes, freeTimes, setFreeTimes, miscConstraints, setMiscConstraints,}}>
            {props.children}
        </ConstraintsContext.Provider>
    );
}

export default ConstraintsContextProvider;
