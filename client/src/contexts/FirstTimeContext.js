import React, { createContext, useState } from 'react';

// Course information sent by the server
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