import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import DetailPage from './pages/DetailPage';
import Home from './pages/Home';
import { FetchErrorButton } from './components/Buttons';

import { PokemonRootObject } from './interfaces/interfaces';
import styled from 'styled-components';

import loadingSpinner from './images/loadingSpinner.svg';

const App: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<PokemonRootObject[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchPokemon = async () => {
      let urlList: string[] = [];
      for (let i = 1; i <= 150; i++) {
        urlList = [...urlList, `https://pokeapi.co/api/v2/pokemon/${i}`];
      }
      Promise.all(urlList.map((url: string) => axios.get(url)))
        .then((responses: Object[]) => {
          let newData: PokemonRootObject[] = [];
          responses.forEach((response: any) => {
            newData = [...newData, response.data];
          });
          setLoading(false);
          setPokemonList(newData);
        })
        .catch(() => {
          setLoading(false);
          setError(true);
        });
    };
    fetchPokemon();
  }, []);

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
