import React, {createContext, useState} from 'react' 
import { Appearance } from 'react-native'
import { styles} from '../assets/styling/globalStyles'


export const ColorThemeContext = createContext({})

export const ColorThemeContextProvider = ({ children }) => {

    const [isDarkMode, setIsDarkMode] = useState(false)

    const globalStyles = styles(isDarkMode)

    return(
        <ColorThemeContext.Provider value={{isDarkMode, setIsDarkMode, globalStyles}}>
            {children}
        </ColorThemeContext.Provider>
    )
}
