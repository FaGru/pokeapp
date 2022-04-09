import React from 'react';
import { useState, useEffect } from 'react';
import Pokecard from './components/Pokecard';

const App: React.FC = () => {
  const [pokemonList, setPokemonList] = useState([])

  useEffect(() => {
    for (let i = 1; i <= 20; i++) {
      fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }
  }, []);

  const fetchPokemon = async (url: string) => {
    console.log(url);
    const response = await fetch(url);
    const data: Object = await response.json();
    console.log(data);
    setPo
  };

  return (
    <>
      <div>Hello world</div>
      <Pokecard />
    </>
  );
};

export default App;
