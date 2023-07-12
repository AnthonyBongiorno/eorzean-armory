import React from 'react';
import styled from 'styled-components';

const DeleteGear = ({ gearId, onDelete }) => {
  
    const deleteGear = async () => {
      // Access userId from local storage
      const userData = JSON.parse(localStorage.getItem('user'));
      const userId = userData._id;
  
      try {
        const response = await fetch('/items/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ gearId, userId }),
        });
  
        if (!response.ok) {
          throw new Error('Response is not OK');
        }
  
        onDelete(gearId);  // Trigger the update function in the parent component
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <DeleteButton onClick={deleteGear}>
        Delete Gear
      </DeleteButton>
    );
  };
  
  const DeleteButton = styled.button`
    /* Styles as needed */
  `;
  
  export default DeleteGear;