import React from 'react';

const Search = () => {
  return (
    <div className='container bg-primary flex search'>
      <label className='h3' htmlFor='search'>
        What we're reading today?
      </label>
      <div className='input flex'>
        <span className='material-symbols-outlined'>search</span>
        <input placeholder={'Search'} id='search' name='search' />
      </div>
    </div>
  );
};

export default Search;
