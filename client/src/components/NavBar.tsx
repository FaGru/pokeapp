import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import useStore from '../hooks/useStore';
import backendUseStore from '../hooks/backendUseStore';

const NavBar = () => {
  const { userData, logOut } = backendUseStore(state => state);
  const { isSearchVisible, setIsSearchVisible } = useStore(state => state);

  const handleClick = (): void => {
    setIsSearchVisible();
  };

  return (
    <header>
      <Container>
        <NavLink to="/">
          <Logo
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1280px-International_Pok%C3%A9mon_logo.svg.png"
            alt="Pokemon Logo"
          />
        </NavLink>
        <Button onClick={handleClick}>
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
      </Container>
    </header>
  );
};

export default NavBar;

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
  grid-template-columns: auto auto 50px 200px;
  align-items: center;
  border-bottom: 1px solid var(--font-color-grey);
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

const Logo = styled.img`
  width: 180px;
  margin: 5px 0 5px 20px;
  @media (max-width: 500px) {
    width: 125px;
  }
`;

const Button = styled.button`
  grid-column: 3 / 4;
  border: none;
  background: none;
  cursor: pointer;
  /* background-color: gray; */
  /* width: 70px;
  height: 35px;
  border-radius: 10px; */
  justify-self: flex-end;
  /* box-shadow: 0px 0px 30px 5px white; */
`;
