
import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from './UserContext';

const Header = () => {
  const { user, setUser, refetch, setRefetch } = useContext(UserContext);
  const [isNavVisible, setIsNavVisible] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
    //eslint-disable-next-line
  }, [refetch]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setRefetch(!refetch);
  };

  return (
    <>
      <HeaderContainer>
        <Logo>Eorzean Armory</Logo>
        <Nav>
        <NavLinks>
  <LinkContainer>
    <StyledLink to="/">Home</StyledLink>
  </LinkContainer>
  {!user && (
    <>
      <LinkContainer>
        <StyledLink to="/signup">Sign Up</StyledLink>
      </LinkContainer>
      <LinkContainer>
        <StyledLink to="/login">Log In</StyledLink>
      </LinkContainer>
    </>
  )}
  {user && (
    <>
      <LinkContainer>
        <StyledLink to="/mygear">My Gear</StyledLink>
      </LinkContainer>
      <LinkContainer>
        <StyledLink to="/mycharacters">My Characters</StyledLink>
      </LinkContainer>
      <LinkContainer>
        <StyledLink to="/attachcharacter">Attach Character</StyledLink>
      </LinkContainer>
      <LinkContainer>
        <StyledLink to="/gearsearch">Gear Search</StyledLink>
      </LinkContainer>
      <LinkContainer>
        <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
      </LinkContainer>
    </>
  )}
</NavLinks>
        </Nav>
        {user && <Username>Welcome User : {user.username}!</Username>}
      </HeaderContainer>
      <PushDownContent />
    </>
  );
};

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: white;
  padding: 0.5rem;
  background-color: #1d2324;
  border: black solid 1px;
  border-radius: 0px; // This will give you sharp corners
  margin-right: 1rem;

  &:hover {
    color: var(--teal);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
`;

const PushDownContent = styled.div`
  height: 3rem;
  margin-bottom: 30px;
`;

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-image: url('https://img.finalfantasyxiv.com/lds/h/x/-CyKaYy1NoWYzCHEoA84A5kMT0.jpg?_gl=1*1lv3ti3*_gcl_au*MjY4NjcyNTIyLjE2ODgwNzk1NDU.&_ga=2.54776939.1135867187.1689100477-15041940.1688079546');
  background-size: auto;
  background-position: 25% 38%;
  color: white;
  padding: 1rem;
  border-bottom: black solid 1px;
`;

const Logo = styled.h1`
  margin-right: 1rem;
  
`;

const Nav = styled.nav``;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
`;

const NavLink = styled.li`
  margin-right: 1rem;
`;

const Username = styled.div`
  margin-left: auto;
  padding: 0.5rem;
  background-color: #1d2324;
  border-radius: 5px;
  border: black solid 1px;
`;


export default Header;