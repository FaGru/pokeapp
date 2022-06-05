import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
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

  it('Fills out input fields correctly (form) and checks if submit button is active', () => {
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

    userEvent.type(usernameInput, 'Marius Kaiser');
    userEvent.type(emailInput, 'hello@world.com');
    userEvent.type(passwordInput, 'HelloWorld123');
    userEvent.type(passwordConfirmInput, 'HelloWorld123');
    expect(submitButton).not.toBeDisabled();
  });

  it('Fills out input fields incorrectly (form) and checks if submit button is disabled', () => {
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

    userEvent.type(usernameInput, 'Marius Kaiser');
    userEvent.type(emailInput, 'hello@world.com');
    userEvent.type(passwordInput, 'Hello');
    userEvent.type(passwordConfirmInput, 'HelloWorld123');
    expect(submitButton).toBeDisabled();
  });

});
