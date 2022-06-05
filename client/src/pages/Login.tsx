import styled from 'styled-components';
import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { FaSignInAlt } from 'react-icons/fa';
import backendUseStore from '../hooks/backendUseStore';
import { useNavigate } from 'react-router-dom';

interface formInterface {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isError, userLoginInformation } = backendUseStore(
    state => state
  );
  const [formData, setFormData] = useState<formInterface>({
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
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
          <FormLabel htmlFor="email">
            Email:
            <br />
            <input
              onChange={handleChange}
              value={email}
              type="email"
              name="email"
              placeholder="Enter your Email"
              required
            />
          </FormLabel>
          <FormLabel htmlFor="password">
            Password:
            <br />
            <input
              onChange={handleChange}
              type="password"
              value={password}
              name="password"
              placeholder="Enter your password"
              required
            />
          </FormLabel>
          <SubmitButton type="submit">login</SubmitButton>
          {isError && <ErrorMessage>{isError}</ErrorMessage>}
        </LoginForm>
      </section>
    </div>
  );
};

export default Login;
const HeaderSection = styled.section`
  text-align: center;
  margin-top: 120px;
`;
const ErrorMessage = styled.p`
  color: red;
`;

const LoginForm = styled.form`
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

const FormLabel = styled.label`
  text-align: left;
  display: block;
  margin: 0 0 5px 3px;
  width: 50%;
`;

const SubmitButton = styled.button`
  border-radius: 5px;
  background: var(--font-color-psychic);
  color: var(--font-color-white);
  font-size: 16px;

  cursor: pointer;
  padding: 10px 20px;
  width: 50%;
  box-shadow: 0px 10px 20px 0px #ea5d604d;
`;

