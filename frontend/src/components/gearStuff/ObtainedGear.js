import React from 'react';
import { styled } from 'styled-components';


const ObtainButton = ({ gearId, userData, setUserData }) => {
  const handleObtained = async () => {
    console.log(userData._id, gearId);
    try {
      const response = await fetch('/gear/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userData._id,
          gearId: gearId,
          isObtained: true,
        }),
      });

      if (response.ok) {
        const updatedGearList = userData.gear.map((gear) => 
          gear.id === gearId ? { ...gear, isObtained: true } : gear
        );
        const updatedUserData = { ...userData, gear: updatedGearList };
        setUserData(updatedUserData);
        localStorage.setItem('user', JSON.stringify(updatedUserData));
      } else {
        console.error('Failed to mark gear as obtained');
      }
    } catch (error) {
      console.error('Server error', error);
    }
  };

  return (
    <StyledObtainButton onClick={handleObtained}>Obtained</StyledObtainButton>
  );
};

const StyledObtainButton = styled.button`
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  cursor: pointer;

  &:hover {
    background-color: darkgreen;
  }
`;

export default ObtainButton;