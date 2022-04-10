import React from 'react';
import { useState, useEffect } from 'react';
import Pokecard from './components/Pokecard';
import axios from 'axios';
import styled from 'styled-components';

const App: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [fetchCounter, setFetchCounter] = useState<number>(1);

  useEffect(() => {
    if (fetchCounter <= 150) {
      const fetchData = async () => {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${fetchCounter}`
        );
        const resData = res.data;

        setPokemonList([...pokemonList, resData]);
        setFetchCounter(prev => prev + 1);
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCounter]);

  return (
    <>
      <h1>Poke World</h1>
      <PokemonContainer>
        {pokemonList.map(pokemon => (
          <Pokecard
            key={pokemon.id}
            name={pokemon.name}
            number={pokemon.id}
            types={pokemon.types}
            image={pokemon.sprites.front_default}
            color={pokemon.types[0].type.name}
          />
        ))}
      </PokemonContainer>
    </>
  );
};

export default App;

const PokemonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
`;
