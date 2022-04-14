import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import DetailPage from './pages/DetailPage';
import Home from './pages/Home';

import { RootObject } from './interfaces/interfaces';

const App: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<RootObject[]>([]);
  const [fetchCounter, setFetchCounter] = useState<number>(1);

  useEffect(() => {
    if (fetchCounter <= 100) {
      const fetchData = async () => {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${fetchCounter}`
        );
        const resData = res.data;
        setPokemonList([...pokemonList, resData]);
        setFetchCounter(prev => prev + 1);
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCounter]);

  return (
    <>
      <h1>Poke World</h1>
      <Routes>
        <Route path="/" element={<Home pokemonList={pokemonList} />} />
        {pokemonList.map(pokemon => (
          <Route
            path={`/pokemon-${pokemon.id}`}
            element={
              <DetailPage
                key={pokemon.id}
                name={pokemon.name}
                number={pokemon.id}
                types={pokemon.types}
                color={pokemon.types[0].type.name}
                sprites={pokemon.sprites}
                abilities={pokemon.abilities}
              />
            }
          />
        ))}
      </Routes>
    </>
  );
};

export default App;
