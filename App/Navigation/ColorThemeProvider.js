import React, {createContext, useState} from 'react' 

export const ColorThemeContext = createContext({})

export const ColorThemeContextProvider = ({ children }) => {

    const [isDarkMode, setIsDarkMode] = useState(false)

    return(
        <ColorThemeContext.Provider value={{isDarkMode, setIsDarkMode}}>
            {children}
        </ColorThemeContext.Provider>
    )
}
