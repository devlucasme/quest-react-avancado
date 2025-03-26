import { useState, useEffect, useContext } from 'react';
import { getPokemons, getPokemonData } from '../../services/getApiData';
import styled from 'styled-components';
import { ThemeContext } from '../../contexts/ThemeContext/ThemeContext';
import { Link } from 'react-router-dom';
import { Header } from '../Header/Header';


const PokemonsList = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const { theme } = useContext(ThemeContext);

    const getPokemonsList = async (currentOffset, append = false) => {
        try {
            setLoading(true);
            const response = await getPokemons(currentOffset);
            const promises = response.results.map(async (pokemon) => {
                return await getPokemonData(pokemon.url);
            });
            const results = await Promise.all(promises);
            setPokemons((prevPokemons) => (append ? [...prevPokemons, ...results] : results));
        } catch (error) {
            console.error('Erro ao buscar Pokémons:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPokemonsList(0, false);
    }, []);

    const loadMorePokemon = () => {
        const newOffset = offset + 10;
        setOffset(newOffset);
        getPokemonsList(newOffset, true);
    };

    return (
        <div>
            <Header />
            <PokemonGrid>
                {pokemons.map((pokemon, index) => (
                    <Link key={index} to={`/pokemon/${pokemon.id}`}>
                        <Container key={index}>
                            <div>
                                <p>{pokemon.id}</p>
                            </div>
                            <div>
                                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                            </div>
                            <div>
                                <h3>{pokemon.name}</h3>
                            </div>
                        </Container>
                    </Link>
                ))}
            </PokemonGrid>
            <ContainerButton>
                <ButtonAdd onClick={loadMorePokemon} disabled={loading} theme={theme}>
                    {loading ? 'Carregando...' : 'Buscar mais'}
                </ButtonAdd>
            </ContainerButton>
        </div>
    );
};

const PokemonGrid = styled.div`
   display: grid;
   justify-items: center;
   align-items: center;
   grid-template-columns: repeat(5, 1fr);
   gap: 20px;


    @media (max-width: 1400px) {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        padding: 30px;
    }

`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 40px;
    gap: 10px;
    background-color: #fff;
    color: #000;
    border-radius: 5px;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.10);
    width: 250px;
    height: 250px;
`

const ContainerButton = styled.div`
    margin-top: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ButtonAdd = styled.button`
    width: 30%;
    border: none;
    border-radius: 3px;
    padding: 5px;
    cursor: pointer;
    transition: .4s;
    font-weight: bold;
    margin-bottom: 15px;
    background-color: ${(props) => props.theme.backgroundColorButton};

    &:hover {
        opacity: 0.8;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }
`;

export { PokemonsList };