import React, { useState } from 'react';
import { styled } from 'styled-components';


const servers = [
	"Adamantoise",
	"Aegis",
	"Alexander",
	"Anima",
	"Asura",
	"Atomos",
	"Bahamut",
	"Balmung",
	"Behemoth",
	"Belias",
	"Brynhildr",
	"Cactuar",
	"Carbuncle",
	"Cerberus",
	"Chocobo",
	"Coeurl",
	"Diabolos",
	"Durandal",
	"Excalibur",
	"Exodus",
	"Faerie",
	"Famfrit",
	"Fenrir",
	"Garuda",
	"Gilgamesh",
	"Goblin",
	"Gungnir",
	"Hades",
	"Hyperion",
	"Ifrit",
	"Ixion",
	"Jenova",
	"Kujata",
	"Lamia",
	"Leviathan",
	"Lich",
	"Louisoix",
	"Malboro",
	"Mandragora",
	"Masamune",
	"Mateus",
	"Midgardsormr",
	"Moogle",
	"Odin",
	"Omega",
	"Pandaemonium",
	"Phoenix",
	"Ragnarok",
	"Ramuh",
	"Ridill",
	"Sargatanas",
	"Shinryu",
	"Shiva",
	"Siren",
	"Tiamat",
	"Titan",
	"Tonberry",
	"Typhon",
	"Ultima",
	"Ultros",
	"Unicorn",
	"Valefor",
	"Yojimbo",
	"Zalera",
	"Zeromus",
	"Zodiark",
	"Spriggan",
	"Twintania",
	"Bismarck",
	"Ravana",
	"Sephirot",
	"Sophia",
	"Zurvan",
	"Halicarnassus",
	"Maduin",
	"Marilith",
	"Seraph",
	"HongYuHai",
	"ShenYiZhiDi",
	"LaNuoXiYa",
	"HuanYingQunDao",
	"MengYaChi",
	"YuZhouHeYin",
	"WoXianXiRan",
	"ChenXiWangZuo",
	"BaiYinXiang",
	"BaiJinHuanXiang",
	"ShenQuanHen",
	"ChaoFengTing",
	"LvRenZhanQiao",
	"FuXiaoZhiJian",
	"Longchaoshendian",
	"MengYuBaoJing",
	"ZiShuiZhanQiao",
	"YanXia",
	"JingYuZhuangYuan",
	"MoDuNa",
	"HaiMaoChaWu",
	"RouFengHaiWan",
	"HuPoYuan",
	"ShuiJingTa2",
	"YinLeiHu2",
	"TaiYangHaiAn2",
	"YiXiuJiaDe2",
	"HongChaChuan2",
	"Alpha",
	"Phantom",
	"Raiden",
	"Sagittarius"
] 

const CharacterSearch = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [selectedServer, setSelectedServer] = useState('');
    const [characterData, setCharacterData] = useState(null);
    const [error, setError] = useState(null);
  
    const handleSearch = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch(`/characters/verify?firstName=${firstName}&lastName=${lastName}&serverName=${selectedServer}`);
        const data = await response.json();
  
        if (response.ok) {
          setCharacterData(data);
          setError(null);
        } else {
          setCharacterData(null);
          setError(data.error);
        }
      } catch (error) {
        setCharacterData(null);
        setError('Server error');
      }
    };
  
    const handleClear = () => {
      setFirstName('');
      setLastName('');
      setSelectedServer('');
      setCharacterData(null);
      setError(null);
    };
  
    return (
        <Container>
          <h2>Character Search</h2>
          <Form onSubmit={handleSearch}>
            <Label>
              First Name:
              <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </Label>
            <Label>
              Last Name:
              <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </Label>
            <Label>
              Server:
              <Select value={selectedServer} onChange={(e) => setSelectedServer(e.target.value)}>
                <option value="">Select a server</option>
                {servers.map((server) => (
                  <option key={server} value={server}>
                    {server}
                  </option>
                ))}
              </Select>
            </Label>
            <Button type="submit">Search</Button>
            <Button type="button" onClick={handleClear}>Clear</Button>
          </Form>
          {error && <Error>{error}</Error>}
          {characterData && (
            <CharacterDetails>
                <CharacterDetailsTitle>Character Details</CharacterDetailsTitle>
                <CharacterDetailsItem>Name: {characterData.name}</CharacterDetailsItem>
                <CharacterDetailsItem>Server: {characterData.server}</CharacterDetailsItem>
                <CharacterDetailsItem>Lodestone ID: {characterData.lodestoneId} </CharacterDetailsItem>
                <CharacterDetailsItem>Make sure to save the ID!</CharacterDetailsItem>
                <AvatarStyled src={characterData.avatar} alt="Character Avatar" />
                <CharacterDetailsItem>This Character Claimed: {characterData.isClaimed ? 'Yes' : 'No'}</CharacterDetailsItem>
            </CharacterDetails>
          )}
        </Container>
      );
    };
    
    const Container = styled.div`
      background-color: #262a2b;
      color: white;
      padding: 1rem;
      margin: 0 auto 250px;
      border: black solid 1px;
      border-radius: 5px;
      max-width: 500px;
      
    `;
    
    const Form = styled.form`
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    `;
    
    const Label = styled.label`
      display: flex;
      flex-direction: column;
      padding: 0.5rem;
    `;
    
    const Input = styled.input`
      margin: 0.3rem;
      padding: 0.3rem;
      background-color: #1d2324;
      border: black solid 1px;
      color: white;
      border-radius: 5px;
    `;
    
    const Select = styled.select`
      margin: 0.3rem;
      padding: 0.5rem;
      background-color: #1d2324;
      border: black solid 1px;
      color: white;
      border-radius: 5px;
    `;
    
    const Button = styled.button`
      padding: 0.5rem 1rem;
      background-color: var(--primary-color);
      color: white;
      border: none;
      cursor: pointer;
      background-color: #1d2324;
      border: black solid 1px;
      color: white;
      border-radius: 5px;
      max-width: 70px;
      margin: .4rem auto;
    `;
    
    const Error = styled.p`
      color: var(--error-color);
    `;
    

const CharacterDetails = styled.div`
  background-color: var(--light-gray);
  padding: 0.7rem;
  border-radius: 10px;
  background-color: #1d2324;
  border: black solid 1px;
  max-width: 400px;
  margin: 0 auto;
`;

const CharacterDetailsTitle = styled.h3`
  margin-bottom: 0.5rem;
  
`;

const CharacterDetailsItem = styled.p`
  margin-bottom: 0.5rem;
`;

const AvatarStyled = styled.img`
  max-width: 200px;
  height: auto;
  border-radius: 50%;
  border: black solid 3px;
`;

export default CharacterSearch;