import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
    }

    body {
        background-color: ${(props) => props.theme.backgroundColor};
        color: ${(props) => props.theme.color};
    }

    ul {
        list-style-type: none;
    }

    a {
        text-decoration: none;
        color: #fff;
    }

`

export { GlobalStyles }