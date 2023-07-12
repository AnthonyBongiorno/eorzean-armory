
import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from './UserContext';

const Header = () => {
  const { user, setUser, refetch, setRefetch } = useContext(UserContext);

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
            <NavLink>
              <StyledLink to="/">Home</StyledLink>
            </NavLink>
            {!user && (
              <>
                <NavLink>
                  <StyledLink to="/signup">Sign Up</StyledLink>
                </NavLink>
                <NavLink>
                  <StyledLink to="/login">Log In</StyledLink>
                </NavLink>
              </>
            )}
            {user && (
              <>
                <NavLink>
                  <StyledLink to="/mycharacters">My Characters</StyledLink>
                </NavLink>
                <NavLink>
                  <StyledLink to="/attachcharacter">Attach Character</StyledLink>
                </NavLink>
                <NavLink>
                  <StyledLink to="/gearsearch">Gear Search</StyledLink>
                </NavLink>
                <NavLink>
                  <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
                </NavLink>
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 0.5rem;
  background-color: #1d2324;
  border-radius: 5px;
  border: black solid 1px;

  &:hover {
    color: var(--teal);
  }
`;

const LogoutButton = styled.button`
  text-decoration: none;
  color: white;
  padding: 0.5rem;
  background-color: #1d2324;
  border-radius: 5px;
  border: black solid 1px;
  cursor: pointer;

  &:hover {
    color: var(--teal);
  }
  
`;

const Username = styled.div`
  margin-left: auto;
  padding: 0.5rem;
  background-color: #1d2324;
  border-radius: 5px;
  border: black solid 1px;
`;


export default Header;