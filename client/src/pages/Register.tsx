import styled from 'styled-components';
import { FaUser } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const { username, email, password, password2 } = formData;

  const handleChange = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSumbmit = (e: any) => {
    e.preventDefault();
    console.log(e.target.name);
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
        <RegistrationForm onSubmit={handleSumbmit} onChange={handleChange}>
          <label>
            Username:
            <input
              name="username"
              type="text"
              placeholder="Username"
              required
              value={username}
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
            />
          </label>
          <label>
            Repeat Password:
            <input
              name="password2"
              type="password"
              value={password2}
              placeholder="Confirm password"
              required
            />
          </label>
          <button type="submit">Submit</button>
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
