import NavBar from './NavBar';
import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('NavBar', () => {
  it('renders the Navigation component', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const logo = screen.getByRole('img', { name: 'Pokemon Logo' });
    const search = screen.getByRole('button', { name: 'show search' });
    const login = screen.getByText('Login');
    const register = screen.getByText('Register');

    expect(register && login && search && login).toBeInTheDocument();
  });

  it('renders the MobileNavigation component open and closed', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    const burgerMenuIcon = screen.getByTestId('BurgerMenuIcon');
    expect(burgerMenuIcon).toBeInTheDocument();

    userEvent.click(burgerMenuIcon);

    const login = screen.getByText(/Login/);
    const closeIcon = screen.getByTestId('CloseIcon');
    expect(login).toBeInTheDocument();
    expect(burgerMenuIcon).not.toBeInTheDocument();

    userEvent.click(closeIcon);
    expect(login).not.toBeInTheDocument();
  });
});
