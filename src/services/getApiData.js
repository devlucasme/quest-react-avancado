import axios from "axios";

const getPokemons = async (offset) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
        return response.data;

    } catch (error) {
        console.log(error);
    }
}

const getPokemonData = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export { getPokemons, getPokemonData }