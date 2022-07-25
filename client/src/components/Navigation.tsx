import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';

import useStore from '../hooks/useStore';
import backendUseStore from '../hooks/backendUseStore';

const Navigation = () => {
  const { userData, logOut } = backendUseStore(state => state);
  const { setIsSearchVisible } = useStore(state => state);

  const handleClick = (): void => {
    setIsSearchVisible();
  };

  return (
    <NavigationDesktop>
      <FavoritesLink to="/favorites">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="black"
          viewBox="0 0 16 16"
        >
          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
        </svg>
      </FavoritesLink>
      <Button onClick={handleClick} aria-label="show search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </Button>
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
    </NavigationDesktop>
  );
};

export default Navigation;

const NavigationDesktop = styled.nav`
  display: grid;
  grid-template-columns: auto 50px 50px 200px;
`;

const LinkList = styled.ul`
  grid-column: 4 / 5;
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

const Button = styled.button`
  grid-column: 3 / 4;
  border: none;
  background: none;
  cursor: pointer;
`;

const FavoritesLink = styled(NavLink)`
  grid-column: 2 / 3;
  align-self: center;
  justify-self: center;
`;
