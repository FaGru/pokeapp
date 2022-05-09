import DetailAbout from './DetailAbout';
import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { testPokedetails, testPokemonTypeDetails } from './TestProps';
import useStore from '../hooks/useStore';

//Write test data into pokemonTypeDetails in Store
useStore.getState().pokemonTypeDetails = testPokemonTypeDetails;

describe('DetailAbout', () => {
  it('renders all type images', () => {
    render(
      <MemoryRouter>
        <DetailAbout pokemon={testPokedetails} />
      </MemoryRouter>
    );
    const squareImagesElement = screen.getAllByTestId('square-image');
    expect(squareImagesElement.length).toBe(8);
  });
  it('tests the backgroundcolor of the headline', () => {
    render(
      <MemoryRouter>
        <DetailAbout pokemon={testPokedetails} />
      </MemoryRouter>
    );
    const headlineElement = screen.getByTestId('about-headline');
    expect(headlineElement).toHaveAttribute('color', 'grass');
  });
  it('tests the number of infoboxes', () => {
    render(
      <MemoryRouter>
        <DetailAbout pokemon={testPokedetails} />
      </MemoryRouter>
    );
    const infoboxElement = screen.getAllByTestId('infobox');
    expect(infoboxElement.length).toBe(6);
  });
});
