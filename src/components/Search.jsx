/* eslint-disable react/prop-types */

import  { useState } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import axios from 'axios';
import debounce from 'lodash/debounce'; // Import debounce from lodash

const SearchBar = ({ onCitySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Debounce the API call function
  const handleSearchChange = debounce(async (value) => {
    if (value.length > 2) {
      try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/find?q=${value}&type=like&sort=population&cnt=30&appid=${'c915e6e66dab25f5295a6355a032defc'}`);
        setSuggestions(response.data.list);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      setSuggestions([]);
    }
  }, 300); 

  const handleInputChange = (event, newInputValue) => {
    setSearchTerm(newInputValue);
    handleSearchChange(newInputValue); // Call debounced function
  };

  return (
    <Autocomplete
      freeSolo
      options={suggestions.map((city) => city.name)}
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField {...params} label="Search for a city" variant="outlined" />
      )}
      onChange={(event, value) => onCitySelect(value)} 
    />
  );
};

export default SearchBar;
