import React, { createContext, useState } from 'react';

export const CustomisationContext = createContext();

const CustomisationContextProvider = (props) => {
    const [customOptions, setCustomOptions] = useState({timetableOrientation: "landscape", displaySetting: "light"});

    return (
        <CustomisationContext.Provider value={{customOptions, setCustomOptions}}>
            {props.children}
        </CustomisationContext.Provider>
    );
}

export default CustomisationContextProvider;
