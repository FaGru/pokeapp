import DetailHeader from './DetailHeader';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { testPokedetails } from './TestProps';

const handleNavigate = jest.fn();
describe('Header', () => {
  it('renders the images of the component', () => {
    render(
      <MemoryRouter>
        <DetailHeader
          pokemon={testPokedetails}
          handleNavigate={handleNavigate}
        />
      </MemoryRouter>
    );
    const imageBackElement = screen.getByAltText('back');
    const imagePointsElement = screen.getByAltText('Points');
    const imagePokeballElement = screen.getByAltText('Pokeball');
    const imagesPokeTypes = screen.getAllByAltText('poke-type');

    expect(imageBackElement).toBeInTheDocument();
    expect(imagePointsElement).toBeInTheDocument();
    expect(imagePokeballElement).toBeInTheDocument();
    expect(imagesPokeTypes.length).toBe(2);
  });

  it('renders four buttons of the component', () => {
    render(
      <MemoryRouter>
        <DetailHeader
          pokemon={testPokedetails}
          handleNavigate={handleNavigate}
        />
      </MemoryRouter>
    );
    const allButtonElements = screen.getAllByRole('button');
    expect(allButtonElements.length).toBe(4);
    expect(allButtonElements[0]).toHaveAttribute('aria-label', 'back-button');
    expect(allButtonElements[1]).toHaveTextContent('About');
    expect(allButtonElements[2]).toHaveTextContent('Stats');
    expect(allButtonElements[3]).toHaveTextContent('Evolution');
  });

  it('checks the name and number of the pokemon', () => {
    render(
      <MemoryRouter>
        <DetailHeader
          pokemon={testPokedetails}
          handleNavigate={handleNavigate}
        />
      </MemoryRouter>
    );
    const infoContainerElements = screen.getByTestId('infocontainer');

    expect(infoContainerElements).toHaveTextContent(/bulbasaur/i);
    expect(infoContainerElements).toHaveTextContent(testPokedetails.name);
    expect(infoContainerElements).toHaveTextContent('#1');
    expect(infoContainerElements).toHaveTextContent(`${testPokedetails.id}`);
  });

  it('checks the backgroundcolor of the pokemon', () => {
    render(
      <MemoryRouter>
        <DetailHeader
          pokemon={testPokedetails}
          handleNavigate={handleNavigate}
        />
      </MemoryRouter>
    );

    const componentContainerElement = screen.getByTestId('component-container');
    expect(componentContainerElement).toHaveAttribute('color', 'grass');
  });

  it('test navigate function', () => {
    render(
      <MemoryRouter>
        <DetailHeader
          pokemon={testPokedetails}
          handleNavigate={handleNavigate}
        />
      </MemoryRouter>
    );
    const backButton = screen.getByLabelText('back-button');
    userEvent.click(backButton);
    expect(handleNavigate).toHaveBeenCalledTimes(1);
  });
});
