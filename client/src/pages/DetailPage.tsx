import DetailHeader from '../components/DetailHeader';
import DetailAbout from '../components/DetailAbout';
import DetailStats from '../components/DetailStats';
import DetailEvolution from '../components/DetailEvolution';
import { FetchErrorButton } from '../components/Buttons';
import loadingSpinner from '../images/loadingSpinner.svg';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { PokemonRootObject } from '../interfaces/pokemon_interface';
import { SpeciesPokemonRootObject } from '../interfaces/species_interface';

import useStore from '../hooks/useStore';

const DetailPage: React.FC<{ pokemon: PokemonRootObject }> = ({ pokemon }) => {
  const navigate = useNavigate();

  const handleNavigate: React.MouseEventHandler<HTMLButtonElement> = () => {
    navigate('/');
  };

  const fetchSpeciesData = useStore(state => state.fetchSpeciesData);
  const fetchTypeData = useStore(state => state.fetchTypeData);
  const fetchEvoltionData = useStore(state => state.fetchEvolutionData);

  const {
    loadingSpecies,
    loadingTypes,
    loadingEvolution,
    error,
    pokemonSpeciesDetails,
  } = useStore<{
    loadingSpecies: boolean;
    loadingTypes: boolean;
    loadingEvolution: boolean;
    pokemonSpeciesDetails: SpeciesPokemonRootObject | null;
    error: boolean;
  }>(state => state);

  useEffect(() => {
    fetchSpeciesData(pokemon.id);
    fetchTypeData(pokemon.types[0].type.url);
  }, []);
  useEffect(() => {
    if (pokemonSpeciesDetails) {
      fetchEvoltionData(pokemonSpeciesDetails.evolution_chain.url);
    }
  }, [pokemonSpeciesDetails]);

  if (loadingSpecies || loadingTypes || loadingEvolution) {
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
          <DetailStats pokemon={pokemon} />
          <DetailEvolution pokemon={pokemon} />
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
