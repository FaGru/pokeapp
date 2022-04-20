import DetailAbout from './DetailAbout';
import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { testPokedetails } from './TestProps';

describe('DetailAbout', () => {
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
