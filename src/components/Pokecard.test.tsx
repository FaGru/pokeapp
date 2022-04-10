import Pokecard from './Pokecard';

import { render, screen } from '@testing-library/react';

describe('Pokecard', () => {
  const cardData = {};

  it('renders a Pokemon Card', () => {
    render(
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
    );
    const pokeCard = screen.getByText(/turtok/i);
  });
});
