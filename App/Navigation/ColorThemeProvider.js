import React, {createContext, useState} from 'react' 
import { Appearance } from 'react-native'

export const ColorThemeContext = createContext({})

export const ColorThemeContextProvider = ({ children }) => {

    const colorThemeIsDark = () => {
        const colorTheme = Appearance.getColorScheme();
        if(colorTheme === 'dark') {
            return true
        } else {
            return false
        } 
    }
    const [isDarkMode, setIsDarkMode] = useState(colorThemeIsDark())

    return(
        <ColorThemeContext.Provider value={{isDarkMode, setIsDarkMode}}>
            {children}
        </ColorThemeContext.Provider>
    )
}
