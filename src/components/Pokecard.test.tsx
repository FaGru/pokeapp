import Pokecard from './Pokecard';
import { BrowserRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

describe('Pokecard', () => {
  it('renders a Pokemon Card', () => {
    render(
      <BrowserRouter>
        <Pokecard
          color="red"
          image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png"
          name="turtok"
          number={2}
          types={[
            {
              slot: 1,
              type: {
                name: 'grass',
                url: 'https://pokeapi.co/api/v2/type/12/',
              },
            },
            {
              slot: 2,
              type: {
                name: 'poison',
                url: 'https://pokeapi.co/api/v2/type/4/',
              },
            },
          ]}
        />
      </BrowserRouter>
    );
    const imageElement = screen.getByAltText('turtok');
    const cardContainer = screen.getByTestId('card-container');
    expect(cardContainer).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
  });
});
