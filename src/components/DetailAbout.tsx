import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { PokemonRootObject } from '../interfaces/interfaces';
import { SpeciesPokemonRootObject } from '../interfaces/species_interface';
import axios from 'axios';

export const DetailAbout: React.FC<{ pokemon: PokemonRootObject }> = ({
  pokemon,
}) => {
  const [pokemonSpeciesDetails, setPokemonSpeciesDetails] =
    useState<SpeciesPokemonRootObject | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data }: any = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`
      );
      setPokemonSpeciesDetails(data);
      //{ ERROR STATE?
    };
    console.log('hello');
    fetchData();
  }, []);
  console.log(pokemonSpeciesDetails);
  return (
    <Container>
      <p>
        Bulbasaur can be seen napping in bright sunlight. There is a seed on its
        back. By soaking up the sun's rays, the seed grows progressively larger.
      </p>
      <h4>Pokédex Data</h4>
      <InfoContainer>
        <Infobox>
          <p>Species</p>
          <p>
            <span>{}</span>
          </p>
        </Infobox>
        <Infobox>
          <p>Height </p>
          <p>
            <span>{pokemon.height / 10}m </span>
          </p>
        </Infobox>
        <Infobox>
          <p>Weight </p>
          <p>
            <span>{pokemon.weight}kg</span>
          </p>
        </Infobox>
        <Infobox>
          <p>Abilities</p>
          <p>
            <span>
              {pokemon.abilities[0].ability.name} <br />
              {pokemon.abilities[1].ability.name}
            </span>
          </p>
        </Infobox>
        <Infobox>
          <p>Weaknesses</p>
          <p>
            <span>Weaknesses</span>
          </p>
        </Infobox>
      </InfoContainer>
    </Container>
  );
};

export default DetailAbout;

const Container = styled.div`
  padding: 40px;
  h4 {
    color: var(--font-color-grass);
  }
`;

const InfoContainer = styled.div`
  width: 300px;
  p {
    color: var(--font-color-black);
    font-size: 0.75rem;
    width: 100px;
  }

  span {
    align-items: flex-start;
    font-size: 0.9rem;
    color: #747476;
  }
`;

const Infobox = styled.div`
  display: flex;
`;
