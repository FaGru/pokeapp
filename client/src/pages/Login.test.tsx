import Login from './Login';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

describe('Login', () => {
  it('renders two inputs and a submit button', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const mailInputElement = screen.getByRole('textbox');
    const pwInputElement = screen.getByPlaceholderText('Enter your password');
    const submitButtonElement = screen.getByRole('button', { name: 'login' });
    expect(
      mailInputElement && pwInputElement && submitButtonElement
    ).toBeInTheDocument();
  });
  it('checks the attributes of the two inputs', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const mailInputElement = screen.getByPlaceholderText('Enter your Email');
    const pwInputElement = screen.getByPlaceholderText('Enter your password');
    expect(mailInputElement).toHaveAttribute('type', 'email');
    expect(mailInputElement).toHaveAttribute('required');
    expect(pwInputElement).toHaveAttribute('type', 'password');
    expect(pwInputElement).toHaveAttribute('required');
  });
});
