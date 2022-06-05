import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import backendUseStore from '../hooks/backendUseStore';

const NavBar = () => {
  const { userData, logOut } = backendUseStore(state => state);
  return (
    <header>
      <Container>
        <Link to="/">
          <Logo
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1280px-International_Pok%C3%A9mon_logo.svg.png"
            height="80"
            width="200"
          />
        </Link>
        {userData ? (
          <LinkList>
            <li>Hello {userData.name}!</li>
            <li>
              <button onClick={() => logOut()}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </LinkList>
        ) : (
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
        )}
      </Container>
    </header>
  );
};

export default NavBar;

const LinkList = styled.ul`
  grid-column: 3 / 4;
  display: flex;
  justify-self: end;
  gap: 10px;
  text-decoration: none;
  list-style: none;
  a {
    color: var(--font-color-black);
    text-decoration: none;
    margin: 5px;
  }
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  margin: 5px;
`;

const Logo = styled.img``;
