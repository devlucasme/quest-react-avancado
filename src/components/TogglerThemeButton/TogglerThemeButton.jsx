import { useContext } from "react";
import { ThemeContext, themes } from "../../contexts/ThemeContext/ThemeContext";
import IconSun from '../../assets/sun.png';
import IconMoon from '../../assets/moon.png';
import styled from "styled-components";

const TogglerThemeButton = () => {
    
    const { theme, setTheme } = useContext(ThemeContext);   

    return (
        <ButtonTheme onClick={() => setTheme(theme === themes.light ? themes.dark : themes.light)}>
            <img src={theme === themes.light ? IconSun : IconMoon} alt="icons theme" />
        </ButtonTheme>
    )
}

export const ButtonTheme = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    transition: .4s;
    
    
    &:hover {
        opacity: 0.8;
    }

    img {
        width: 100px;
    }

    @media (max-width: 720px) {
        width: 30%;
    }

`

export { TogglerThemeButton }