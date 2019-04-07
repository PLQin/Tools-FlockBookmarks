import React, { Component } from 'react';

import { Search } from '@component';

import style from '../../assets/scss/index.scss';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={style.home_page}>
        <Search />
      </div>
    );
  }
}

export default Home;
