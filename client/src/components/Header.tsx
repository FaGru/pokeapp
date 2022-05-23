import React from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header>
      <Container>
        <Link to="/">PokeApp</Link>
        <LinkList>
          <li>
            <Link to="/login">
              <FaSignInAlt /> Login
            </Link>
          </li>
          <li>
            <Link to="/register">
              <FaUser /> Register
            </Link>
          </li>
        </LinkList>
      </Container>
    </header>
  );
};

export default Header;

const LinkList = styled.ul`
  display: flex;
  text-decoration: none;
  list-style: none;
  a {
    color: var(--font-color-black);
    text-decoration: none;
    margin: 5px;
  }
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
`;
