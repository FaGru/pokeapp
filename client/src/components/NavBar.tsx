import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import useStore from '../hooks/useStore';
import backendUseStore from '../hooks/backendUseStore';
import '../styles/navbar.css';

import HamImage from '../images/hamburger-menu.svg';

const NavBar = () => {
  const { userData, logOut } = backendUseStore(state => state);
  const { isSearchVisible, setIsSearchVisible } = useStore(state => state);

  const handleClick = (): void => {
    setIsSearchVisible();
  };

  return (
    <header>

      <div className='navigation-container'>
        <nav className="navbar navbar-expand-lg">
          <div className='logo-expand-bundle'>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerNavbar" aria-controls="navbarTogglerNavbar" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-icon"><img src={HamImage} width={24} /></span>
            </button>
            <NavLink to="/">
              <Logo
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1280px-International_Pok%C3%A9mon_logo.svg.png"
                alt="Pokemon Logo"
                width="180px"
              />
            </NavLink>
          </div>
          <div className="collapse navbar-collapse" id="navbarTogglerNavbar">
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              <li className='nav-item nav-item-url'>
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
                  <span className='d-lg-none d-xl-none'><label className='icon-detail'>Favourites</label></span>
                </FavoritesLink>
              </li>
              <li className="nav-item nav-item-url">
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
                  <span className='d-lg-none d-xl-none'><label className='icon-detail'>Search</label></span>
                </Button>
              </li>
              {userData ? (
                <>
                  <li className="nav-item nav-item-url"><label className='icon-detail'>Hello {userData.name}!</label></li>
                  <li className="nav-item nav-item-url">
                    <button onClick={() => logOut()}>
                      <FaSignOutAlt /> <label className='icon-detail'>Logout</label>
                    </button>
                  </li></>
              ) : (
                <>
                  <li className="nav-item nav-item-url">
                    <NavLink to="/login">
                      <FaSignInAlt /> <label className='icon-detail'>Login</label>
                    </NavLink>
                  </li>
                  <li className="nav-item nav-item-url">
                    <NavLink to="/register">
                      <FaUser /> <label className='icon-detail'>Register</label>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>

    </header>
  );
};

export default NavBar;

const Logo = styled.img`
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
  justify-self: flex-end;
`;

const FavoritesLink = styled(NavLink)`
grid-column: 2 / 3;
`;
