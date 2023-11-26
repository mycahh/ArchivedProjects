import React from 'react';
import './SearchChat.css';

function SearchChat({searchValue, setSearchValue}) {

  const onSearchValueChange = (event) => {
  setSearchValue(event.target.value);
}

  return (
    <input 
      className="Search" 
      placeholder="Buscar" 
      value= {searchValue}
      onChange = {onSearchValueChange}
    />
  );
}

export { SearchChat };
