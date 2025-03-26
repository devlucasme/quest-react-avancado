import PokedexLogo from '../../assets/pokedex-logo.png';
import styled from "styled-components";
import { TogglerThemeButton } from '../TogglerThemeButton/TogglerThemeButton';

const Header = () => {
    return (
        <HeaderContainer>
            <ImagePokedex src={PokedexLogo} alt="pokemon logo" />
            <TogglerThemeButton />
        </HeaderContainer>
    )
}

export const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 40px;
`

export const ImagePokedex = styled.img`
    width: 350px;

    @media (max-width: 1200px) {
        width: 60%;
    }

`

export { Header }