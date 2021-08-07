import React, { createContext, useState } from 'react';

// User settings for customisation, such as light or dark mode
export const CustomisationContext = createContext();

const CustomisationContextProvider = (props) => {
    const [customOptions, setCustomOptions] = useState({timetableOrientation: "landscape", displaySetting: "lightMode"});

    return (
        <CustomisationContext.Provider value={{customOptions, setCustomOptions}}>
            {props.children}
        </CustomisationContext.Provider>
    );
}

export default CustomisationContextProvider;
