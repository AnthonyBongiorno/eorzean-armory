import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const DeleteCharacter = ({ characterId }) => {
    const navigate = useNavigate();
  
    const deleteCharacter = async () => {
      // character name and userId
      const userData = JSON.parse(localStorage.getItem('user'));
      const characters = userData?.characters || [];
      const character = characters.find((char) => char.characterId === characterId);
      const { characterName } = character;
      const { _id: userId } = userData;
  
      try {
        const response = await fetch('/characters/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ characterName, userId }),
        });
  
        if (!response.ok) {
          throw new Error('Response is not OK');
        }
  
        // delete the character from local storage
        const updatedCharacters = characters.filter((char) => char.characterId !== characterId);
        userData.characters = updatedCharacters;
        localStorage.setItem('user', JSON.stringify(userData));
  
        // navigate to MyCharacters page after deleting character
        navigate('/mycharacters');
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <DeleteButton onClick={deleteCharacter}>
        Delete Character
      </DeleteButton>
    );
  };

const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #1d2324;
  border: black solid 1px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;

export default DeleteCharacter;