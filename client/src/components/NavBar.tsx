import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import backendUseStore from '../hooks/backendUseStore';

const NavBar = () => {
  const { userData, logOut } = backendUseStore(state => state);
  return (
    <header>
      <Container>
        <NavLink to="/">
          <Logo
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1280px-International_Pok%C3%A9mon_logo.svg.png"
            width="180px"
          />
        </NavLink>
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
              <NavLink to="/login">
                <FaSignInAlt /> Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register">
                <FaUser /> Register
              </NavLink>
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
  margin-right: 20px;

  a {
    color: var(--font-color-black);
    text-decoration: none;
    margin: 5px;
    :hover {
      border-bottom: 1px solid black;
    }
  }
`;
const Container = styled.div`
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;

  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: lightgray;
  position: fixed;
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  border-bottom: 1px solid var(--font-color-grey);
`;
const Logo = styled.img`
  margin: 5px 0 5px 20px;
`;
