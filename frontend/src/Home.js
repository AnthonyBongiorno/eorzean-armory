import React from 'react';
import styled from 'styled-components';
import About from './components/LandingPage/About';
import CharacterSearch from './components/LandingPage/CharacterSearch';

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
  background-color: var(--navy-blue);
  color: white;
  padding: 1rem;
  text-align: center;
`;

const ContentContainer = styled.div`
  max-width: 800px; 
  margin: 0 auto; 
`;

export default Home;