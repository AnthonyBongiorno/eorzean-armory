import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import DeleteCharacter from '../characterStuff/CharacterDelete';

const SingleCharacter = () => {
  const { characterId } = useParams();

  // Retrieve character data from local storage
  const userData = JSON.parse(localStorage.getItem('user'));
  const characters = userData?.characters || [];
  const character = characters.find((char) => char.characterId === Number(characterId));

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <CharacterContainer>
      <CharacterBox>
        <CharacterAvatar src={character.avatar} alt="Character Avatar" />
        <CharacterName>{character.characterName}</CharacterName>
        <ComingSoon>Server: {character.serverName}</ComingSoon>
        <ComingSoon>MORE FEATURES COMING SOON</ComingSoon>
        <DeleteCharacter characterId={character.characterId} />
      </CharacterBox>
    </CharacterContainer>
  );
};

const ComingSoon = styled.p`
padding: 10px;
`

const CharacterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
 
`;

const CharacterBox = styled.div`
  background-color: #262a2b;
  color: white;
  padding: 2rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const CharacterAvatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

const CharacterName = styled.h3`
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.5rem;
`;

export default SingleCharacter;



