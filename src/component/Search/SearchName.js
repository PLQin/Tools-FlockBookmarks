import React from 'react';
import PropType from 'prop-types';

import style from '../../assets/scss/search/search.scss';

function SearchName(props) {
  const { searchConfig, SearchNames, onChangeSearchName } = props;

  return (
    <ul className={style.search_name_list}>
      {Object.keys(searchConfig).map(item => {
        return (
          <li
            className={
              SearchNames.en.toLocaleLowerCase() === searchConfig[item].en.toLocaleLowerCase() ? style.active : ''
            }
            key={searchConfig[item].id}
            id={searchConfig[item].en}
            onClick={() => {
              onChangeSearchName(searchConfig[item].en);
            }}
            onKeyDown={() => {}}
          >
            {searchConfig[item].zh}
          </li>
        );
      })}
    </ul>
  );
}

SearchName.propTypes = {
  searchConfig: PropType.object,
  SearchNames: PropType.object,
  onChangeSearchName: PropType.func
};

export default SearchName;
