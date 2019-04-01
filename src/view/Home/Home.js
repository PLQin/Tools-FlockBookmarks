import React, { Component } from 'react';

import { Search } from '@component';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Search />
      </div>
    );
  }
}

export default Home;
