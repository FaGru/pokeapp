import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import useStore from './hooks/useStore';

import DetailPage from './pages/DetailPage';
import Home from './pages/Home';
import { FetchErrorButton } from './components/Buttons';

import { PokemonRootObject } from './interfaces/interfaces';

import loadingSpinner from './images/loadingSpinner.svg';

const App: React.FC = () => {
  const pokemonList = useStore<PokemonRootObject[]>(state => state.pokemonList);
  const setPokemonList = useStore<() => Promise<void>>(
    state => state.setPokemonList
  );
  const error = useStore<boolean>(state => state.error);
  const loading = useStore<boolean>(state => state.loading);
  useEffect(() => {
    setPokemonList();
  }, []);

  const handleReload = () => {
    window.location.reload();
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
        <Routes>
          <Route path="/" element={<Home pokemonList={pokemonList} />} />
          {pokemonList?.map(pokemon => (
            <Route
              key={pokemon.id}
              path={`/${pokemon.name}`}
              element={<DetailPage pokemon={pokemon} />}
            />
          ))}
        </Routes>
      )}
    </>
  );
};

export default App;

const LoadingContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform: -webkit-translate(-50%, -50%);
  transform: -moz-translate(-50%, -50%);
  transform: -ms-translate(-50%, -50%);
`;
