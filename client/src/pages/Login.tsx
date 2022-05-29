import styled from 'styled-components';
import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { FaSignInAlt } from 'react-icons/fa';
import backendUseStore from '../hooks/backendUseStore';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isError, userLoginInformation } = backendUseStore<any>(
    state => state
  );
  const [formData, setFormData] = useState<any>({
    email: '',
    password: '',
  });
  useEffect(() => {
    //If userLoginInformation found navigate to home
    if (Object.keys(userLoginInformation).length !== 0) {
      navigate('/');
    }
  }, [userLoginInformation]);
  const { email, password } = formData;

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div>
      <NavBar />
      <HeaderSection>
        <h1>
          <FaSignInAlt /> Login!
        </h1>
        <p>Please login!</p>
      </HeaderSection>
      <section>
        <LoginForm onSubmit={handleSubmit}>
          <label htmlFor="email">
            email:
            <br />
            <input
              onChange={handleChange}
              value={email}
              name="email"
              placeholder="email"
              required
            />
          </label>
          <label htmlFor="password">
            Password:
            <br />
            <input
              onChange={handleChange}
              type="password"
              value={password}
              name="password"
              placeholder="Password"
              required
            />
          </label>
          <button type="submit">login</button>
          {isError && <ErrorMessage>{isError}</ErrorMessage>}
        </LoginForm>
      </section>
    </div>
  );
};

export default Login;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px;
`;

const HeaderSection = styled.section`
  text-align: center;
`;
const ErrorMessage = styled.p`
  color: red;
`;
