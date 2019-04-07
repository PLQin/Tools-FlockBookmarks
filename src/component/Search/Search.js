import React, { Component } from 'react';

import SearchUI from './SearchUI';
import SearchName from './SearchName';
import { searchList } from '@request';
import { searchConfig, defaultSearchName } from '@config';
import style from '../../assets/scss/search/search.scss';

class Search extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.onChangeSearchValue = this.onChangeSearchValue.bind(this);

    this.state = {
      SearchNames: searchConfig[defaultSearchName],
      searchValue: ''
    };
  }

  onChangeSearchName(item) {
    this.setState(() => {
      return {
        searchValue: '',
        SearchNames: searchConfig[item.toLocaleLowerCase()]
      };
    });
  }

  onChangeSearchValue(e) {
    const { value } = e.target;

    this.setState(
      () => {
        return {
          searchValue: value
        };
      },
      () => {
        const { searchValue, SearchNames } = this.state;

        searchList({
          value: searchValue,
          search: SearchNames
        });
      }
    );
  }

  render() {
    const { SearchNames, searchValue } = this.state;

    console.log(SearchNames);

    return (
      <div className={style.search_content_block}>
        <SearchName
          SearchNames={SearchNames}
          onChangeSearchName={this.onChangeSearchName}
          searchConfig={searchConfig}
        />
        <SearchUI SearchNames={SearchNames} searchValue={searchValue} onChangeSearchValue={this.onChangeSearchValue}>
          {SearchNames.message}
        </SearchUI>
      </div>
    );
  }
}

export default Search;
