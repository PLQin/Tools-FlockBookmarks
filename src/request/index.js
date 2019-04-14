import axios from 'axios';

import * as searchXHR from '@config/xhr.js';

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const searchList = value => {
  // console.log(searchXHR['baidu']);
  const searchXHRValue = { ...searchXHR };

  const search = {
    url: searchXHRValue[value.search.en.toLocaleLowerCase()].url,
    params: {
      [searchXHRValue[value.search.en.toLocaleLowerCase()].params]: value.value
    }
  };

  axios
    .get('http://localhost:3000/api/tasks')
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    });
};

export { searchList };
