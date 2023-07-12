import React from 'react';
import styled from 'styled-components';
import About from './components/LandingPage/About';
import CharacterSearch from './components/characterStuff/CharacterSearch';

const Home = () => {
  return (
    <Container>
      <ContentContainer>
        <h1>Welcome to The Eorzean Armory</h1>
        <About />
        <CharacterSearch /> 
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  color: white;
  padding: 1rem;
  text-align: center;
  max-width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 100px;
  border-radius: 10px;
`;

const ContentContainer = styled.div`
  max-width: 800px; 
  margin: 0 auto; 
`;

export default Home;