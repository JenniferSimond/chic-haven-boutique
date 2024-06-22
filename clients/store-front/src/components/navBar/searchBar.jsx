import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import search from '../../assets/icons-svg/search.svg'

import searchLight from '../../assets/icons-svg/searchLight.svg'

const SearchBarWrapper = styled.form`
  display: flex;
  align-items: center;
  background-color: #F9F5E3;
  border-radius: 2px;
  overflow: hidden;
  width: 300px;
  height: 25px;
  

`;


const SearchBox = styled.input`
    background-color: #F9F5E3;
    width: 300px;
    height: 29px;
    border: none;
  
    margin: 8px;
    outline: none;
`

const SearchButton = styled.button`
  background-color: #FFBC42;
  border: none;
  width: 41px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  cursor: pointer;

  &:hover {
  background-color: #22223B;
  }
`;

const SearchIcon = styled.img`
  width: 29px;
  height: 29px;
  ${SearchButton}:hover & {
  opacity:0.8;
    content: url(${props => props.$hoverIcon});
  }
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

  console.log('Search Input (Search) -->', searchInput)
    return(
        <SearchBarWrapper onSubmit={handleSubmit} >
            <SearchBox type='text' onChange={handleChange} value={searchInput} placeholder='Search products'/>
            <SearchButton>
                <SearchIcon src={search} $hoverIcon={searchLight} alt='Search Icon'/>
            </SearchButton>
        </SearchBarWrapper>
        
    );
}

export default SearchBar