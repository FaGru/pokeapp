import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import useStore from './hooks/useStore';

import DetailPage from './pages/DetailPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { FetchErrorButton } from './components/Buttons';

import { PokemonRootObject } from './interfaces/pokemon_interface';

import loadingSpinner from './images/loadingSpinner.svg';

const App: React.FC = () => {
  const pokemonList = useStore<PokemonRootObject[]>(state => state.pokemonList);
  const fetchPokemonList = useStore<() => Promise<void>>(
    state => state.fetchPokemonList
  );
  const error = useStore<boolean>(state => state.error);
  const loadingPokemon = useStore<boolean>(state => state.loadingPokemon);
  useEffect(() => {
    fetchPokemonList();
  }, []);

  if (loadingPokemon === true) {
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
        <Routes>
          <Route path="/" element={<Home />} />
          {pokemonList?.map(pokemon => (
            <Route
              key={pokemon.id}
              path={`/${pokemon.name}`}
              element={<DetailPage pokemon={pokemon} />}
            />
          ))}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
