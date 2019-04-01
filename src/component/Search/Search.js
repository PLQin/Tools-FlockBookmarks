import React, { Component } from 'react';

import SearchUI from './SearchUI';
import SearchName from './SearchName';

class Search extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='search-content-block'>
        <SearchName />
        <SearchUI />
      </div>
    );
  }
}

export default Search;
