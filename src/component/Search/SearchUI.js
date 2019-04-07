import React from 'react';
import PropType from 'prop-types';
import SearchList from './SearchList';

function SearchUI(props) {
  const { SearchNames, onChangeSearchValue, children, searchValue } = props;

  return (
    <div className='search-form-block'>
      <form>
        <input value={searchValue} type='text' onChange={onChangeSearchValue} />
        <a href={SearchNames.url(searchValue)} target='_blank' rel='noopener noreferrer'>
          {children}
        </a>
      </form>
      <SearchList />
    </div>
  );
}

SearchUI.propTypes = {
  SearchNames: PropType.object,
  onChangeSearchValue: PropType.func,
  children: PropType.string,
  searchValue: PropType.string
};

export default SearchUI;
