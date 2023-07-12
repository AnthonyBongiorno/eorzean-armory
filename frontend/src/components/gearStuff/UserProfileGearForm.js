import React, { useState } from 'react';
import styled from 'styled-components';
import GearButton from '../gearStuff/SendGearToUser';
import ItemUICategories from './GearPartArray';

const GearSearch = () => {
    const [minLevelItem, setMinLevelItem] = useState('');
    const [maxLevelItem, setMaxLevelItem] = useState('');
    const [itemUICategoryId, setItemUICategoryId] = useState('');
    const [searchResults, setSearchResults] = useState([]);
  
    const fetchItems = async () => {
      try {
        const queryParams = new URLSearchParams({
          minLevelItem,
          maxLevelItem,
          itemUICategoryId
        });
  
        const response = await fetch(`/items?${queryParams}`);
        const data = await response.json();
  
        // filter out non-item results
        const itemResults = data.Results.filter(item => item.UrlType === 'Item');
  
        setSearchResults(itemResults);
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      fetchItems();
    };
  
    return (
      <div>
        <Container>
          <h2>Gear Search</h2>
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="minLevelItem">Min Level:</Label>
            <Input
              type="text"
              id="minLevelItem"
              value={minLevelItem}
              onChange={(e) => setMinLevelItem(e.target.value)}
            />
  
            <Label htmlFor="maxLevelItem">Max Level:</Label>
            <Input
              type="text"
              id="maxLevelItem"
              value={maxLevelItem}
              onChange={(e) => setMaxLevelItem(e.target.value)}
            />
  
            <Label htmlFor="itemUICategoryId">Item Category:</Label>
            <Select
              id="itemUICategoryId"
              value={itemUICategoryId}
              onChange={(e) => setItemUICategoryId(e.target.value)}
            >
              {ItemUICategories.map((category) => (
                <option key={category.ID} value={category.ID}>
                  {category.Name}
                </option>
              ))}
            </Select>
  
            <Button type="submit">Search</Button>
          </Form>
        </Container>
        <Container>
          <h3>Search Results</h3>
          <Results>
            {searchResults.length > 0 ? (
              searchResults.map((item) => (
                <Item key={item.ID}>
                  <img src={`https://xivapi.com${item.Icon}`} alt={item.Name} title={item.Name} />
                  <p>{item.Name}</p>
                  <GearButton gear={item} /> 
                </Item>
              ))
            ) : (
              <p>No results found.</p>
            )}
          </Results>
        </Container>
      </div>
    );
  };

  const MainContainer = styled.div`
  max-width: 450px;`

const Container = styled.div`
  background-color: #262a2b;
  color: white;
  padding: 1rem;
  margin: 50px auto 100px;
  border: black solid 1px;
  border-radius: 5px;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: black solid 1px ;
  border-radius: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem; /* Add some space between form and results */
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

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #1d2324;
  border: black solid 1px;
  color: white;
  border-radius: 5px;
  max-width: 70px;
  margin: .4rem auto;
  cursor: pointer;
`;

const Results = styled.div`
  margin: 50px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #1d2324;
  border: black solid 1px;
  border-radius: 5px;
  padding: 1rem;
`;

const Select = styled.select`
  margin: 0.3rem;
  padding: 0.3rem;
  background-color: #1d2324;
  border: black solid 1px;
  color: white;
  border-radius: 5px;
`;


export default GearSearch;