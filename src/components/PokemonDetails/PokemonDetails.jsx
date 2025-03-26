import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeContext } from '../../contexts/ThemeContext/ThemeContext';
import { Header } from '../Header/Header';

const PokemonDetails = () => {
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const { id } = useParams();
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const getPokemonDetails = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const data = response.data;
                const abilities = await Promise.all(
                    data.abilities.map(async (ability) => {
                        const abilityResponse = await axios.get(ability.ability.url);
                        const abilityData = abilityResponse.data;

                        const descriptionEntry = abilityData.flavor_text_entries.find(entry => entry.language.name === 'en')
                            || abilityData.flavor_text_entries[0];

                        return {
                            name: ability.ability.name,
                            description: descriptionEntry ? descriptionEntry.flavor_text : "No description available"
                        };
                    })
                );

                const pokemonData = {
                    name: data.name,
                    image: data.sprites?.front_default || "",
                    types: data.types ? data.types.map((type) => type.type.name) : [],
                    moves: data.moves ? data.moves.map((move) => move.move.name) : [],
                    abilities,
                    id: data.id,
                };

                setPokemonDetails(pokemonData);

            } catch (error) {
                console.log('Error fetching Pokemon details:', error);
            }
        };

        getPokemonDetails();
    }, [id]);

    if (!pokemonDetails) {
        return <Loading>Loading...</Loading>;
    }

    return (
        <div>
            <Header />
            <Container>
                <Card>
                    <PokemonInfo>
                        <p><strong>{pokemonDetails.id}</strong></p>
                        <img src={pokemonDetails.image} alt={pokemonDetails.name} />
                        <h2>{pokemonDetails.name}</h2>
                        <p><strong>Types:</strong> {pokemonDetails.types.length > 0 ? pokemonDetails.types.join(", ") : "None"}</p>
                    </PokemonInfo>
                    <Section>
                        <h3>Abilities</h3>
                        {pokemonDetails.abilities.length > 0 ? (
                            <ul>
                                {pokemonDetails.abilities.map((ability, index) => (
                                    <li key={index}>
                                        <strong>{ability.name}</strong>: {ability.description}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No abilities found.</p>
                        )}
                    </Section>
                    <Section>
                        <h3>Moves</h3>
                        <MoveList>
                            {pokemonDetails.moves.slice(0, pokemonDetails.moves.length > 300 ? pokemonDetails.moves.length - 200 : pokemonDetails.moves.length).map((move, index) => (
                                <li key={index}>{move}</li>
                            ))}
                        </MoveList>
                    </Section>
                    <ButtonContainer>
                        <StyledLink to='/'>
                            <Button theme={theme}>Home</Button>
                        </StyledLink>
                    </ButtonContainer>
                </Card>
            </Container>
        </div>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 30px;
`;

const Card = styled.div`
    background-color: #f0f3f4;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 100%;
    max-width: 1200px;

    @media (max-width: 1200px) {
        width: 70%;
    }

`;

const PokemonInfo = styled.div`
    img {
        width: 120px;
        height: 120px;
        object-fit: contain;
    }
    h2 {
        margin: 10px 0;
    }

`;

const Section = styled.div`
    margin-top: 15px;
    text-align: left;

    h3 {
        border-bottom: 2px solid #ddd;
        padding-bottom: 5px;
        margin-bottom: 10px;
    }

    @media (max-width: 768px) {
        text-align: center;
    }

`;

const MoveList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 5px;

    li {
        background-color: #eee;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 14px;
    }
`;

const ButtonContainer = styled.div`
    margin-top: 20px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const Button = styled.button`
    background-color: ${(props) => props.theme.backgroundColorButton};
    color: #000;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: 0.3s;
    width: 30%;

    &:hover {
        opacity: 0.8;
    }

    @media (max-width: 576px) {
        width: 100%;
    }

`;

const Loading = styled.p`
    text-align: center;
    font-size: 18px;
    font-weight: bold;
`;

export { PokemonDetails };