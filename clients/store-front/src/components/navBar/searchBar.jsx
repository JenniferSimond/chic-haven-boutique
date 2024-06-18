import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import search from '../../assets/icons-svg/search.svg'

const SearchBarWrapper = styled.form`
  display: flex;
  align-items: center;
  background-color: #F9F5E3;
  border-radius: 3px;
  overflow: hidden;
  width: 230px;
  height: 29px;

`;


const SearchBox = styled.input`
    background-color: #F9F5E3;
    width: 220px;
    height: 29px;
    border: none;
  
    margin: 8px;
    outline: none;
`

const SearchButton = styled.button`
  background-color: #FFBC42;
  border: none;
  width: 41px;
  height: 29px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  cursor: pointer;

  &:hover {
  background-color: #D81159;
  }
`;

const SearchIcon = styled.img`
  width: 26px;
  height: 26px;
`;

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // trim white space 
    if (searchInput.trim()) {
      // sedning the search input with url as a query parameter --> Learn more about this
      navigate(`/products?search=${searchInput.trim()}`)
    }
    setSearchInput('')
    console.log('Search Form!')
  }

  const handleChange = (event) => {
    console.log('Event ->', event.target.value)
    setSearchInput(event.target.value)
  }

  console.log('Search -->', searchInput)
    return(
        <SearchBarWrapper onSubmit={handleSubmit} >
            <SearchBox type='text' onChange={handleChange} value={searchInput} placeholder='Search products'/>
            <SearchButton>
                <SearchIcon src={search} alt='Search Icon'/>
            </SearchButton>
        </SearchBarWrapper>
        
    );
}

export default SearchBar