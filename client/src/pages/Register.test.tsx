import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import backendUseStore from '../hooks/backendUseStore';
import Register from '../pages/Register';
describe('Register', () => {
  it('Renders four input fields and submit button', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    // const all = screen.getByRole('');
    const usernameInput = screen.getByRole('textbox', { name: 'Username:' });
    const emailInput = screen.getByRole('textbox', { name: 'Email:' });
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    const passwordInput = screen.getByPlaceholderText('Enter password');
    const passwordConfirmInput =
      screen.getByPlaceholderText('Confirm password');

    expect(
      usernameInput &&
        emailInput &&
        submitButton &&
        passwordInput &&
        passwordConfirmInput
    ).toBeInTheDocument();
  });

  it('Checks the attributes of submitButton', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    const usernameInput = screen.getByRole('textbox', { name: 'Username:' });
    const emailInput = screen.getByRole('textbox', { name: 'Email:' });
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    const passwordInput = screen.getByPlaceholderText('Enter password');
    const passwordConfirmInput =
      screen.getByPlaceholderText('Confirm password');

    expect(submitButton).toBeDisabled();
  });

  it('Fills out form and checks if button is active');
});
