import React from 'react';
import styled from 'styled-components';

import { RootObject } from '../interfaces/interfaces';

import Pokecard from '../components/Pokecard';

const Test: React.FC<{ pokemonList: RootObject[] }> = ({pokemonList }) => {
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
