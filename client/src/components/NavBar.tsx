import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import backendUseStore from '../hooks/backendUseStore';

const NavBar = () => {
  const { userData, logOut } = backendUseStore(state => state);

  return (
    <header>
      <Container>
        <Link to="/">PokeApp</Link>
        <LinkList>
          {userData ? (
            <li>
              <button onClick={() => logOut()}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          ) : (
            <>
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
            </>
          )}
        </LinkList>
      </Container>
    </header>
  );
};

export default NavBar;

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
