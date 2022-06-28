import FavoritePage from './FavoritePage';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import backendUseStore from '../hooks/backendUseStore';
import { testPokedetails } from '../components/TestProps';

describe('FavoritePage', () => {
  it('renders the message if no user is logged in', () => {
    render(
      <MemoryRouter>
        <FavoritePage />
      </MemoryRouter>
    );
    const infoMessage = screen.getByText(
      'Please login to add pokemons to your favorites.'
    );
    expect(infoMessage).toBeInTheDocument();
  });

  it('renders the message if the user is logged in, but no pokemon is liked', () => {
    backendUseStore.getState().userData = {
      name: 'test',
      email: 'test',
      id: 'test',
    };
    render(
      <MemoryRouter>
        <FavoritePage />
      </MemoryRouter>
    );
    const infoMessage = screen.getByText(
      'Click on a Pokeball on the mainpage to like a Pokemon'
    );
    expect(infoMessage).toBeInTheDocument();
  });
});
