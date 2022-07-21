import React from 'react';
import styled from 'styled-components';
import { nanoid } from 'nanoid';
import { PokemonRootObject } from '../interfaces/pokemon_interface';

import arrow from '../images/arrow.svg';
import backgroundPokeball from '../images/Background-Pokeball-Grey.svg';

import useStore from '../hooks/useStore';

const DetailEvolution: React.FC<{ pokemon: PokemonRootObject }> = ({
  pokemon,
}) => {
  const { pokemonList, activeDetailComponent, pokemonEvolutionChain } =
    useStore(state => state);
  let pokemonEvolutionArray: PokemonRootObject[] = [];

  const findEvolutionPokemons = () => {
    const pokemon1: string | undefined =
      pokemonEvolutionChain?.chain.species.name;
    const pokemon2: string | undefined =
      pokemonEvolutionChain?.chain.evolves_to[0]?.species.name;
    const pokemon3: string | undefined =
      pokemonEvolutionChain?.chain.evolves_to[0]?.evolves_to[0]?.species.name;
    pokemonEvolutionArray = pokemonList.filter(pokemon => {
      if (
        pokemon1 === pokemon.name ||
        pokemon2 === pokemon.name ||
        pokemon3 === pokemon.name
      ) {
        return pokemon;
      }
    });

    if (pokemonEvolutionArray.length === 3) {
      pokemonEvolutionArray.splice(1, 0, pokemonEvolutionArray[1]);
    }
  };
  findEvolutionPokemons();

  return (
    <Container>
      {activeDetailComponent === 'Evolution' ? (
        <div>
          <Headline color={pokemon.types[0].type.name}>
            Evolution Chart
          </Headline>
          <EvolutionContainer>
            {pokemonEvolutionArray.map((pokemon: PokemonRootObject) => (
              <ImageContainer key={nanoid()}>
                <PokeballImg
                  src={backgroundPokeball}
                  alt="Pokeball"
                  height="120px"
                  width="120px"
                />
                <PokemonImg
                  src={pokemon.sprites.other.home.front_default}
                  alt={pokemon.name}
                  width="100px"
                  height="100px"
                  data-testid="pokemon-img"
                />
              </ImageContainer>
            ))}

            {pokemonEvolutionArray[1] ? (
              <ArrowImg src={arrow} alt="arrow" width="30px" height="30px" />
            ) : null}
            {pokemonEvolutionArray[3] ? (
              <ArrowImg src={arrow} alt="arrow" width="30px" height="30px" />
            ) : null}
          </EvolutionContainer>
        </div>
      ) : null}
    </Container>
  );
};

export default DetailEvolution;

const Container = styled.div`
  padding: 10px;
`;
const Headline = styled.h4`
  color: var(--font-color-${props => props.color});
  text-align: center;
`;

const PokemonImg = styled.img`
  z-index: 500;
`;

const ImageContainer = styled.div`
  position: relative;
  cursor: pointer;
  justify-self: center;
  margin-top: 20px;
`;
const PokeballImg = styled.img`
  position: absolute;
  left: 50%;
  top: 58%;
  transform: translate(-50%, -50%);
  z-index: -1;
`;
const EvolutionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: 1fr 1fr;
  div:nth-child(1) {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }
  div:nth-child(2) {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
  }
  div:nth-child(3) {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }
  div:nth-child(4) {
    grid-column: 3 / 4;
    grid-row: 2 / 3;
  }
`;
const ArrowImg = styled.img`
  grid-column: 2 / 3;
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-self: center;
  margin-top: 20px;
`;
