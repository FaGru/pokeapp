import styled from 'styled-components';
import { useState } from 'react';

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<any>({
    username: '',
    password: '',
  });
  console.log(loginData);
  const handleLogin = (event: any) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <LoginForm onSubmit={handleLogin} onChange={handleLogin}>
        <label htmlFor="username">
          Username:
          <br />
          <input name="username" placeholder="Username" required />
        </label>
        <label htmlFor="password">
          Password:
          <br />
          <input name="password" placeholder="Password" required />
        </label>
        <button type="submit">login</button>
      </LoginForm>
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
