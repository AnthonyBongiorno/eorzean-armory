import { Link } from 'react-router-dom';
import styled from 'styled-components';
import DeleteCharacter from '../characterStuff/CharacterDelete';

const MyCharacters = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const characters = userData?.characters || [];

  return (
    <>
      <Heading>Character List</Heading>
      <CharacterList>
        <Grid>
          {characters.map((character, index) => (
            <CharacterLink key={index} to={`/characters/${character.characterId}`}>
              <CharacterBox>
                <CharacterAvatar src={character.avatar} alt="Character Avatar" />
                <CharacterName>{character.characterName}</CharacterName>
                <p>Server: {character.serverName}</p>
                <DeleteCharacter characterId={character.characterId} />
              </CharacterBox>
            </CharacterLink>
          ))}
        </Grid>
      </CharacterList>
    </>
  );
};


const CharacterList = styled.div`
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  justify-items: center;
`;

const CharacterLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const CharacterBox = styled.div`
  background-color: #262a2b;
  color: white;
  padding: 1rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  border: black solid 1px;
`;

const CharacterAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 0.5rem;
`;

const CharacterName = styled.h3`
  margin-bottom: 0.5rem;
  text-align: center;
`;

const Heading = styled.h2`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  text-align: center;
  color: white;
  font-size: 1.5rem;
`;

export default MyCharacters;