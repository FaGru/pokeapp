import DetailHeader from '../components/DetailHeader';
import DetailAbout from '../components/DetailAbout';
import { FetchErrorButton } from '../components/Buttons';
import loadingSpinner from '../images/loadingSpinner.svg';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { PokemonRootObject } from '../interfaces/interfaces';
import { SpeciesPokemonRootObject } from '../interfaces/species_interface';
import { TypesPokemonRootObject } from '../interfaces/types_interface';

const DetailPage: React.FC<{ pokemon: PokemonRootObject }> = ({ pokemon }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleNavigate: React.MouseEventHandler<HTMLButtonElement> = () => {
    navigate('/');
  };

  const [pokemonSpeciesDetails, setPokemonSpeciesDetails] =
    useState<SpeciesPokemonRootObject | null>(null);
  const [pokemonTypeDetails, setPokemonTypeDetails] =
    useState<TypesPokemonRootObject | null>(null);

  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchSpeciesData = async () => {
      setLoading(true);
      const { data }: any = await axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`)
        .catch(() => {
          setLoading(false);
          setError(true);
        });
      setPokemonSpeciesDetails(data);
    };

    const fetchTypeData = async () => {
      setLoading(true);
      const { data }: any = await axios
        .get(pokemon.types[0].type.url)
        .catch(() => {
          setLoading(false);
          setError(true);
        });
      setLoading(false);
      setPokemonTypeDetails(data);
    };

    fetchSpeciesData();
    fetchTypeData();
  }, [pokemon.id, pokemon.types]);

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
        <div>
          <DetailHeader pokemon={pokemon} handleNavigate={handleNavigate} />
          <DetailAbout
            pokemon={pokemon}
            pokemonTypeDetails={pokemonTypeDetails}
            pokemonSpeciesDetails={pokemonSpeciesDetails}
          />
        </div>
      )}
    </>
  );
};
export default DetailPage;

const LoadingContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform: -webkit-translate(-50%, -50%);
  transform: -moz-translate(-50%, -50%);
  transform: -ms-translate(-50%, -50%);
`;
