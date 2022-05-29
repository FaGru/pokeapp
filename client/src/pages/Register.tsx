import styled from 'styled-components';
import { FaUser } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import backendUseStore from '../hooks/backendUseStore';
import NavBar from '../components/NavBar';

import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register, userLoginInformation } = backendUseStore<any>(
    state => state
  );
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = formData;
  const { isLoading, isError } = backendUseStore<any>(state => state);

  const navigate = useNavigate();

  useEffect(() => {
    //If userLoginInformation found navigate to home
    if (Object.keys(userLoginInformation).length !== 0) {
      navigate('/');
    }
  }, [userLoginInformation]);

  const handleChange = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSumbmit = (e: any) => {
    e.preventDefault();
    register(formData);
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
        <RegistrationForm onSubmit={handleSumbmit}>
          <label>
            Username:
            <input
              name="name"
              type="text"
              placeholder="name"
              required
              value={name}
              onChange={handleChange}
            />
          </label>
          <label>
            E-Mail:
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={handleChange}
            />
          </label>
          <label>
            Password:
            <input
              name="password"
              type="password"
              value={password}
              placeholder="Password"
              required
              onChange={handleChange}
            />
          </label>
          {/* <label>
            Repeat Password:
            <input
              name="password2"
              type="password"
              value={password2}
              placeholder="Confirm password"
              required
              onChange={handleChange}
            />
          </label> */}
          <button type="submit">
            {isLoading ? 'Loading Data from Server' : 'Submit'}
          </button>
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
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100vw;
`;

const ErrorMessage = styled.p`
  color: red;
`;
