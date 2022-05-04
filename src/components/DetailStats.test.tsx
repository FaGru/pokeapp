import DetailStats from './DetailStats';
import { PokemonRootObject } from '../interfaces/pokemon_interface';
import { SpeciesPokemonRootObject } from '../interfaces/species_interface';
import { TypesPokemonRootObject } from '../interfaces/types_interface';
import useStore from '../hooks/useStore';

import { testPokedetails, evolutionChain, pokeList } from './TestProps';

import { render, screen } from '@testing-library/react';

useStore.getState().activeDetailComponent = 'Stats';

describe('DetailStats', () => {
  it('render pokmon stats', () => {
    render(<DetailStats pokemon={testPokedetails} />);

    const headingElement = screen.getByRole('heading');

    expect(headingElement).toBeInTheDocument();
  });
  it('render 7 stat names', () => {
    render(<DetailStats pokemon={testPokedetails} />);
    const allStatNameElements = screen.getAllByTestId('stat-name');
    expect(allStatNameElements.length).toBe(7);
  });
  it('renders 6 stat bars and tests it color property', () => {
    render(<DetailStats pokemon={testPokedetails} />);
    const allStatBarElements = screen.getAllByTestId('stat-bar');
    expect(allStatBarElements.length).toBe(6);
    allStatBarElements.forEach(barElement => {
      expect(barElement).toHaveAttribute('color', 'grass');
    });
  });

  it('dont renders component because of wrong activeDetailComponent', () => {
    useStore.getState().activeDetailComponent = 'Evolution';
    render(<DetailStats pokemon={testPokedetails} />);
    const allStatNameElements = screen.queryAllByTestId('stat-name');
    expect(allStatNameElements.length).toBe(0);
  });
});
