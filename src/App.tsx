import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import DetailPage from './pages/DetailPage';
import Home from './pages/Home';

import { PokemonRootObject } from './interfaces/interfaces';

const App: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<PokemonRootObject[]>([]);
  const [fetchCounter, setFetchCounter] = useState<number>(1);

  useEffect(() => {
    if (fetchCounter <= 150) {
      const fetchData = async () => {
        const { data }: any = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${fetchCounter}`
        );
        setPokemonList([...pokemonList, data]);
        setFetchCounter(prev => prev + 1);
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCounter]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home pokemonList={pokemonList} />} />
        {pokemonList.map(pokemon => (
          <Route
            key={pokemon.id}
            path={`/pokemon-${pokemon.id}`}
            element={<DetailPage pokemon={pokemon} />}
          />
        ))}
      </Routes>
    </>
  );
};

export default App;
