import React, { useState } from 'react';
import styled from 'styled-components';
import DeleteGear from '../gearStuff/GearDelete';
import ObtainButton from './ObtainedGear';

const GearList = () => {
  const initialData = JSON.parse(localStorage.getItem('user'));
  const [userData, setUserData] = useState(initialData);

  const gearList = userData?.gear || [];

  const handleDelete = (gearId) => {
    const updatedGearList = gearList.filter((gear) => gear.id !== gearId);
    const updatedUserData = { ...userData, gear: updatedGearList };
    setUserData(updatedUserData);  // This will cause a re-render
    localStorage.setItem('user', JSON.stringify(updatedUserData));
  };

  const handleUpdate = (gearId) => {
    const updatedGearList = userData.gear.map((gear) =>
      gear.id === gearId ? { ...gear, isObtained: true } : gear
    );
    const updatedUserData = { ...userData, gear: updatedGearList };
    setUserData(updatedUserData);
    localStorage.setItem('user', JSON.stringify(updatedUserData));
  };

  return (
  <GearListContainer>
    <h1>Your Saved Gear</h1>
    <GearItems>
      {gearList.filter(gear => !gear.isObtained).map((gear, index) => (
        <GearItem key={index}>
          <GearItemImage src={`https://xivapi.com${gear.icon}`} alt={gear.name} />
          <p>{gear.name}</p>
          <ObtainButton gearId={gear.id} userData={userData} setUserData={setUserData} onUpdate={handleUpdate} />
          <DeleteGear gearId={gear.id} onDelete={handleDelete} />
        </GearItem>
      ))}
    </GearItems>
    <h2>Your Obtained Gear</h2>
    <GearItems>
      {gearList.filter(gear => gear.isObtained).map((gear, index) => (
        <GearItem key={index}>
          <GearItemImage src={`https://xivapi.com${gear.icon}`} alt={gear.name} />
          <p>{gear.name}</p>
          <DeleteGear gearId={gear.id} onDelete={handleDelete} />
        </GearItem>
      ))}
    </GearItems>
  </GearListContainer>
);
};

const GearListContainer = styled.div`
  background-color: #262a2b;
  color: white;
  padding: 1rem;
  margin: 50px auto;
  max-width: 850px;
  border: black solid 1px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const GearItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #1d2324;
  border: black solid 1px;
  border-radius: 5px;
  padding: 1rem;
  margin: 0.5rem;
`;

const GearItemImage = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 0.5rem;
`;

const GearItems = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 1rem;
`;

export default GearList;