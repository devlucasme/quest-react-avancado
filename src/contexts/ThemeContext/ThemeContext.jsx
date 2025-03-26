import { createContext, useState } from "react";

export const themes = {
    light: {
        backgroundColor: '#24c1f7',
        backgroundColorButton: '#ece219',
    },
    dark: {
        backgroundColor: '#484848',
        backgroundColorButton: '#f7bc1c',
    }
}

export const ThemeContext = createContext({});

export const ThemeProvider = ({children}) => {
    
    const [theme, setTheme] = useState(themes.light);

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )

}