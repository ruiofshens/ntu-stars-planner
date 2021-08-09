import React, { createContext, useState } from 'react';

// Used for dismissing of tip
export const FirstTimeContext = createContext();

const FirstTimeContextProvider = (props) => {
    const [firstTime, setFirstTime] = useState(true);

    return (
        <FirstTimeContext.Provider value={{firstTime, setFirstTime}}>
            {props.children}
        </FirstTimeContext.Provider>
    );
}

export default FirstTimeContextProvider;