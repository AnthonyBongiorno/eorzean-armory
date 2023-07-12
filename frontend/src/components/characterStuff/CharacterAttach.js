import React, { useState, useContext } from 'react';
import { UserContext } from '../../UserContext';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

const AttachCharacter = () => {
    const [characterName, setCharacterName] = useState('');
    const [serverName, setServerName] = useState('');
    const { user, setUser } = useContext(UserContext);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
  
    const handleAttachCharacter = async (e) => {
      e.preventDefault();
  
      try {
        const userId = user._id;
  
        const response = await fetch('/character', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            characterName,
            serverName,
            userId,
          }),
        });
  
        const data = await response.json();
        console.log(data);

        if (response.ok) {
          // Update the characters array in local storage
          const updatedUser = { ...user, characters: [...user.characters, data.newCharacter] };
          localStorage.setItem('user', JSON.stringify(updatedUser));
  
          // Update the user context state
          setUser(updatedUser);
  
          setMessage(data.message);
          setError('');
        } else {
          setMessage('');
          setError(data.error);
        }
      } catch (error) {
        setMessage('');
        setError('Server error');
      }
    };

    const handleClear = () => {
        setCharacterName('');
        setServerName('');
      };
  
    return (
        <Container>
          <h2>Attach Character</h2>
          <Form onSubmit={handleAttachCharacter}>
            <Label>
              Character Name:
              <Input type="text" value={characterName} onChange={(e) => setCharacterName(e.target.value)} />
            </Label>
            <Label>
              Server Name:
              <Select value={serverName} onChange={(e) => setServerName(e.target.value)}>
                <option value="">Select a server</option>
                {servers.map((server) => (
                  <option key={server} value={server}>
                    {server}
                  </option>
                ))}
              </Select>
            </Label>
            <ButtonGroup>
              <Button type="submit">Attach Character</Button>
              <Button type="button" onClick={handleClear}>Clear</Button>
            </ButtonGroup>
          </Form>
          <ErrorMessage>
          {message && <p>{message}</p>}
          {error && <p>{error}</p>}
          </ErrorMessage>
        </Container>
      );
    };
    
    const ErrorMessage = styled.div`
    display: flex;
    justify-content: center;
    margin: 10px;
    `

    const Container = styled.div`
      background-color: #262a2b;
      color: white;
      padding: 1rem;
      border-radius: 5px;
      max-width: 500px;
      margin: 0 auto;
      border: black solid 1px;
    `;
    
    const Form = styled.form`
      display: flex;
      flex-direction: column;
      margin-top: 1rem;
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
    
    const ButtonGroup = styled.div`
      display: flex;
      gap: 1rem; 
      justify-content: center ;
    `;
    
    const Button = styled.button`
      padding: 0.5rem 1rem;
      background-color: #1d2324;
      border: black solid 1px;
      color: white;
      border-radius: 5px;
      cursor: pointer;
     
    `;

export default AttachCharacter;