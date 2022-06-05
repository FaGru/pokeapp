import styled from 'styled-components';
import { FaUser } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import backendUseStore from '../hooks/backendUseStore';
import NavBar from '../components/NavBar';

import { useNavigate } from 'react-router-dom';

interface formInterface {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

const Register = () => {
  const { register, userLoginInformation } = backendUseStore(state => state);
  const [formData, setFormData] = useState<formInterface>({
    name: '',
    email: '',
    password: '',
    password_confirm: '',
  });
  const { name, email, password, password_confirm } = formData;
  const { isLoading, isError } = backendUseStore(state => state);

  const navigate = useNavigate();

  useEffect(() => {
    //If userLoginInformation found navigate to home
    if (Object.keys(userLoginInformation).length !== 0) {
      navigate('/');
    }
  }, [userLoginInformation]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    if (password !== password_confirm) {
    }
  };
  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    register({ name, email, password });
  };

  return (
    <>
      <NavBar />
      <HeaderSection>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account </p>
      </HeaderSection>
      <section>
        <RegistrationForm onSubmit={handleSubmit}>
          <FormLabel>
            Username:
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              required
              value={name}
              onChange={handleChange}
            />
          </FormLabel>
          <FormLabel>
            Email:
            <input
              name="email"
              type="email"
              placeholder="Enter your Email"
              required
              value={email}
              onChange={handleChange}
            />
          </FormLabel>
          <FormLabel>
            Password:
            <input
              name="password"
              type="password"
              value={password}
              placeholder="Enter password"
              required
              onChange={handleChange}
            />
          </FormLabel>
          <FormLabel>
            Confirm Password:
            <input
              name="password_confirm"
              type="password"
              value={password_confirm}
              placeholder="Confirm password"
              required
              onChange={handleChange}
            />
          </FormLabel>
          <SubmitButton
            type="submit"
            disabled={
              password === password_confirm && password !== '' ? false : true
            }
          >
            {isLoading ? 'Loading Data from Server' : 'Submit'}
          </SubmitButton>
          {isError && <ErrorMessage>{isError}</ErrorMessage>}
        </RegistrationForm>
      </section>
    </>
  );
};

export default Register;

const HeaderSection = styled.section`
  text-align: center;
`;

const RegistrationForm = styled.form`
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  width: 100%;

  border-radius: 5px;
  margin-bottom: 10px;
  font-family: inherit;

  input,
  textarea,
  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    margin-bottom: 10px;
    font-family: inherit;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

const FormLabel = styled.label`
  text-align: left;
  display: block;
  margin: 0 0 5px 3px;
  width: 50%;
`;

const SubmitButton = styled.button`
  border-radius: 5px;
  background: #000;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  padding: 10px 20px;
  width: 50%;
`;
