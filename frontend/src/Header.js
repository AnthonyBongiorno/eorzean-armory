import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SignUp from './components/StuffForHeader/SignUp';

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>Eorzean Armory</Logo>
      <nav>
        <NavLinks>
          <NavLink>
            <Link to="/">Home</Link>
          </NavLink>
          <NavLink>
            <Link to="/signup">Sign In</Link>
          </NavLink>
        </NavLinks>
      </nav>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--navy-blue);
  color: white;
  padding: 1rem;
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  margin-right: 1rem;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
`;

const NavLink = styled.li`
  margin-right: 1rem;
`;


export default Header;