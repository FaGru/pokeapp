import { MemoryRouter } from 'react-router-dom';

import { PokemonRootObject } from '../interfaces/pokemon_interface';
import { EvolutionRootObject } from '../interfaces/evolution_interface';
import DetailEvolution from './DetailEvolution';
import useStore from '../hooks/useStore';
import { testPokedetails, evolutionChain, pokeList } from './TestProps';

import { render, screen } from '@testing-library/react';

useStore.getState().pokemonList = pokeList;
useStore.getState().pokemonEvolutionChain = evolutionChain;
useStore.getState().activeDetailComponent = 'Evolution';

describe('DetailEvolution', () => {
  it('renders all pokeball images', () => {
    render(<DetailEvolution pokemon={testPokedetails} />);

    const allPokeballImageElements = screen.getAllByRole('img', {
      name: 'Pokeball',
    });
    expect(allPokeballImageElements.length).toBe(4);
  });
  it('renders the image of the pokemons', () => {
    render(<DetailEvolution pokemon={testPokedetails} />);
    const pokemonEvolutionImageElements = screen.getAllByTestId('pokemon-img');
    expect(pokemonEvolutionImageElements.length).toBe(4);
  });

  it('dont renders images because wrong activeDetailComponent', () => {
    useStore.getState().activeDetailComponent = 'Stats';
    render(<DetailEvolution pokemon={testPokedetails} />);
    const pokemonEvolutionImageElements = screen.queryAllByRole('img');
    expect(pokemonEvolutionImageElements.length).toBe(0);
  });
});
