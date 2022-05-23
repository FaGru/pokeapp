import styled from 'styled-components';
import { useState } from 'react';
import NavBar from '../components/NavBar';
import { FaSignInAlt } from 'react-icons/fa';

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<any>({
    email: '',
    password: '',
  });
  console.log(loginData);

  const { email, password } = loginData;

  const handleLogin = (event: any) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
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
        <LoginForm onSubmit={handleLogin} onChange={handleLogin}>
          <label htmlFor="email">
            email:
            <br />
            <input value={email} name="email" placeholder="email" required />
          </label>
          <label htmlFor="password">
            Password:
            <br />
            <input
              value={password}
              name="password"
              placeholder="Password"
              required
            />
          </label>
          <button type="submit">login</button>
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
