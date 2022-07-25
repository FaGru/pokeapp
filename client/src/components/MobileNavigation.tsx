import { useState } from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { CgMenu, CgClose } from 'react-icons/cg';
import { GrFavorite } from 'react-icons/gr';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import useStore from '../hooks/useStore';
import backendUseStore from '../hooks/backendUseStore';

export interface BurgerMenuProps {
  openMenu: boolean;
}

const MobileNavigation = () => {
  const { userData, logOut } = backendUseStore(state => state);
  const { setIsSearchVisible } = useStore(state => state);
  const [openMenu, setOpenMenu] = useState(false);

  const handleClick = (): void => {
    setIsSearchVisible();
  };

  return (
    <MobileNav>
      <SearchButton onClick={handleClick} aria-label="show search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </SearchButton>
      {openMenu && (
        <Wrapper openMenu={openMenu}>
          {userData ? (
            <LinkList>
              <li>
                <FavoritesLink to="/favorites">
                  <span>Favorites</span>
                  <GrFavorite />
                </FavoritesLink>
              </li>
              <li onClick={() => logOut()}>
                <NavLink to="/">
                  Logout <FaSignOutAlt />
                </NavLink>
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
              <li>
                <FavoritesLink to="/favorites">
                  <span> Favorites </span>
                  <GrFavorite />
                </FavoritesLink>
              </li>
            </LinkList>
          )}
        </Wrapper>
      )}
      {!openMenu ? (
        <BurgerIcon
          data-testid="BurgerMenuIcon"
          onClick={() => setOpenMenu(!openMenu)}
        />
      ) : (
        <CloseIcon data-testid="CloseIcon" onClick={() => setOpenMenu(!openMenu)} />
      )}
    </MobileNav>
  );
};

export default MobileNavigation;

const MobileNav = styled.div`
  display: flex;
  justify-content: right;
  gap: 20px;
  padding-right: 5px;
  width: 100%;
`;

const Wrapper = styled.div<BurgerMenuProps>`
  display: flex;
  flex-direction: column;

  position: absolute;

  width: 42%;

  top: 61px;
  right: 0;
  z-index: 10;

  border-left: 1px solid var(--font-color-grey);
  border-bottom: 1px solid var(--font-color-grey);
  border-top: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  padding-top: 5px;

  background-color: lightgray;

  ${props =>
    props.openMenu
      ? `  
    animation: appear 1s ease;
    opacity: 0.92;`
      : `animation: disappear 1s ease`}

  @keyframes appear {
    from {
      opacity: 0;
    }

    to {
      opacity: 0.92;
    }
  }

  @keyframes disappear {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }
`;

const LinkList = styled.ul`
  text-decoration: none;
  list-style: none;

  li {
    margin: 5px;
    font-size: 120%;
  }

  a {
    line-height: 1.3rem;
    color: var(--font-color-black);
    text-decoration: none;
    :hover {
      border-bottom: 1px solid black;
    }
  }
  button {
    margin-top: 10px;
  }
`;

const SearchButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  justify-self: flex-end;
`;

const FavoritesLink = styled(NavLink)`
  span {
    margin-right: 5px;
  }
`;

const BurgerIcon = styled(CgMenu)`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const CloseIcon = styled(CgClose)`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
