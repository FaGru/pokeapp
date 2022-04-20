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

import useStore from '../hooks/useStore';

const DetailPage: React.FC<{ pokemon: PokemonRootObject }> = ({ pokemon }) => {
  const navigate = useNavigate();

  const handleNavigate: React.MouseEventHandler<HTMLButtonElement> = () => {
    navigate('/');
  };

  const pokemonTypeDetails = useStore<TypesPokemonRootObject | null>(
    state => state.pokemonTypeDetails
  );
  const pokemonSpeciesDetails = useStore<SpeciesPokemonRootObject | null>(
    state => state.pokemonSpeciesDetails
  );
  const fetchSpeciesData = useStore(state => state.fetchSpeciesData);

  const fetchTypeData = useStore(state => state.fetchTypeData);
  const loadingSpecies = useStore<boolean>(state => state.loadingSpecies);
  const loadingTypes = useStore<boolean>(state => state.loadingTypes);
  const error = useStore<boolean>(state => state.error);

  useEffect(() => {
    fetchSpeciesData(pokemon.id);
    fetchTypeData(pokemon.types[0].type.url);
  }, []);

  if (loadingSpecies || loadingTypes) {
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
          <FetchErrorButton onClick={() => window.location.reload()}>
            RELOAD
          </FetchErrorButton>
        </>
      ) : (
        <div>
          <DetailHeader pokemon={pokemon} handleNavigate={handleNavigate} />
          <DetailAbout pokemon={pokemon} />
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
