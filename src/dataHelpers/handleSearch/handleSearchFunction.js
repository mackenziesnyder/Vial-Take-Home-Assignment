import React, { useState } from 'react';
import { TextInput, Button } from '@mantine/core';
import './handleSearch.css';

// Contains code to display search module
function SearchBar({ onSearch, removeSearch }) {
  const [query, setQuery] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(query);
    }
  };

  const handleButtonClick = () => {
    onSearch(query);
  };

  const onRemove = () => {
    removeSearch();
    setQuery('');
  }

  return (
    <div className="search-section">
      <div className="search-instructions">
        Enter the desired content to be searched and click the 'Search' button below.
      </div>
      <TextInput
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search..."
        onKeyDown={handleKeyPress}
      />
      <div className="search-button-container">
        <Button onClick={handleButtonClick}>Search</Button>
        <Button onClick={onRemove}>Remove Search</Button>
      </div>
    </div>
  );
}

export default SearchBar;

