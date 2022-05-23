import styled from 'styled-components';
import { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  console.log(formData);

  const handleChange = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSumbmit = (e: any) => {
    console.log(e.target.name);
  };

  return (
    <div>
      <RegistrationForm onSubmit={handleSumbmit} onChange={handleChange}>
        <label>
          Username:
          <input name="username" type="text" placeholder="Username" required />
        </label>
        <label>
          E-Mail:
          <input name="email" type="email" placeholder="Email" required />
        </label>
        <label>
          Password:
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </label>
        <button type="submit">Submit</button>
      </RegistrationForm>
    </div>
  );
};

export default Register;

const RegistrationForm = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100vw;
`;
