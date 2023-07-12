import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../UserContext'; // Make sure to import the UserContext
import styled from 'styled-components';

const GearButton = ({ gear }) => {
  const { user, setUser } = useContext(UserContext); // Use the UserContext
  const [error, setError] = useState(null);
  const [alreadyAdded, setAlreadyAdded] = useState(false);

  useEffect(() => {
    // Check if gear already exists in the user's gear array
    const isGearAdded = user.gear.some(g => g.id === String(gear.ID));
    setAlreadyAdded(isGearAdded);
  }, [gear, user]);

  const handleClick = async () => {
    // If gear is already added, return
    if (alreadyAdded) return;

    // Format the gear data
    const gearData = {
      id: String(gear.ID),
      icon: gear.Icon,
      name: gear.Name
    };

    try {
      // Use the user's ID from the UserContext
      const userId = user._id;

      // Making POST request to add gear to the user
      const response = await fetch(`/items/post/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gearData), // Use the formatted gear data
      });

      if (!response.ok) {
        throw new Error('Response is not ok');
      }

      // Update the gear array in local storage and in the UserContext
      const updatedUser = { ...user, gear: [...user.gear, gearData] }; // Add the formatted gear data to the gear array
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

    } catch (error) {
      setError('Error adding gear');
      console.error(error);
    }
  };

  return (
    <>
      <StyledButton onClick={handleClick} added={alreadyAdded}>
        {alreadyAdded ? 'Already Added' : 'Add Gear'}
      </StyledButton>
      {error && <p>{error}</p>}
    </>
  );
};

const StyledButton = styled.button`
  background-color: ${props => props.added ? '#f44336' : '#4CAF50'}; // If gear is already added, background color is red, otherwise green
  border: none;
  color: white;
  padding: 4px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 10px;
`;

export default GearButton;