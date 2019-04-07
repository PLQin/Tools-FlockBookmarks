import axios from 'axios';

import * as searchXHR from '@config/xhr.js';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

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
    .get(search.url, {
      params: {
        [searchXHRValue[value.search.en.toLocaleLowerCase()].params]: value.value
      }
    })
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    });
};

export { searchList };
