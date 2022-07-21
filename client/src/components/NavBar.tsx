import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

import MobileNavigation from './MobileNavigation';
import Navigation from './Navigation';

const NavBar = () => {
  const [isMobileUser, setIsMobileUser] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 600) {
      setIsMobileUser(true);
      console.log('in true');
    } else {
      setIsMobileUser(false);
    }
  });
  window.onresize = () => {
    if (window.innerWidth < 600) {
      setIsMobileUser(true);
    } else {
      setIsMobileUser(false);
    }
  };

  console.log('Mobileuser', isMobileUser, 'window.size', window.innerWidth);

  return (
    <header>
      <Container>
        <NavLink to="/">
          <Logo
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1280px-International_Pok%C3%A9mon_logo.svg.png"
            alt="Pokemon Logo"
            width="180px"
          />
        </NavLink>
        {isMobileUser ? <MobileNavigation /> : <Navigation />}
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

  background-color: lightgray;
  position: fixed;
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  border-bottom: 1px solid var(--font-color-grey);
`;

const Logo = styled.img`
  margin: 5px 0 5px 20px;
  @media (max-width: 600px) {
    width: 125px;
  }
`;
