import React from 'react';
import styled from 'styled-components';

import { PokemonRootObject } from '../interfaces/pokemon_interface';

import Pokecard from '../components/Pokecard';
import useStore from '../hooks/useStore';

const Test: React.FC = () => {
  const pokemonList = useStore<PokemonRootObject[]>(state => state.pokemonList);

  return (
    <PokemonContainer>
      {pokemonList?.map(pokemon => (
        <Pokecard
          key={pokemon.id}
          name={pokemon.name}
          number={pokemon.id}
          types={pokemon.types}
          image={pokemon.sprites.other.home.front_default}
          color={pokemon.types[0].type.name}
        />
      ))}
    </PokemonContainer>
  );
};

export default Test;

const PokemonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
`;
