import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { PokemonRootObject } from '../interfaces/interfaces';
import { SpeciesPokemonRootObject } from '../interfaces/species_interface';
import { TypesPokemonRootObject } from '../interfaces/types_interface';

import axios from 'axios';
import loadingSpinner from '../images/loadingSpinner.svg';
import { FetchErrorButton } from './Buttons';

export const DetailAbout: React.FC<{ pokemon: PokemonRootObject }> = ({
  pokemon,
}) => {
  const [pokemonSpeciesDetails, setPokemonSpeciesDetails] =
    useState<SpeciesPokemonRootObject | null>(null);

  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [pokemonTypeDetails, setPokemonTypeDetails] =
    useState<TypesPokemonRootObject | null>(null);

  useEffect(() => {
    const fetchSpeciesData = async () => {
      setLoading(true);
      const { data }: any = await axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`)
        .catch(error => {
          setLoading(false);
          setError(true);
        });
      setPokemonSpeciesDetails(data);
    };

    const fetchTypeData = async () => {
      setLoading(true);
      const { data }: any = await axios
        .get(`https://pokeapi.co/api/v2/type/${pokemon.id}/`)
        .catch(error => {
          setLoading(false);
          setError(true);
        });
      setLoading(false);
      setPokemonTypeDetails(data);
    };

    fetchSpeciesData();
    fetchTypeData();
  }, [pokemon.id]);

  const handleReload = () => {
    window.location.reload();
    setError(false);
  };

  if (loading === true) {
    return (
      <LoadingContainer>
        <img src={loadingSpinner} alt="loading..." height="80" width="80"></img>
      </LoadingContainer>
    );
  }

  return (
    <>
      {error ? (
        <>
          <h3 style={{ color: 'red', margin: '5px' }}>
            Please reload there is an errror
          </h3>
          <FetchErrorButton onClick={handleReload}>RELOAD</FetchErrorButton>
        </>
      ) : (
        <Container>
          <p>{pokemonSpeciesDetails?.flavor_text_entries?.[6].flavor_text}</p>
          <h4>Pokédex Data</h4>
          <InfoContainer>
            <Infobox>
              <p>Species</p>
              <p>
                <span>{pokemonSpeciesDetails?.genera[7].genus}</span>
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
                  {pokemon.abilities[1]?.ability.name}
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
      )}
    </>
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
const LoadingContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform: -webkit-translate(-50%, -50%);
  transform: -moz-translate(-50%, -50%);
  transform: -ms-translate(-50%, -50%);
`;
