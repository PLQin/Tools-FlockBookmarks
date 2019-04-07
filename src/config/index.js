const searchConfig = {
  google: {
    zh: '谷歌',
    en: 'google',
    url: (value = null) => {
      return `https://www.google.com/search?q=${value}&oq=${value}&aqs=chrome&sourceid=chrome&ie=UTF-8`;
    },
    message: 'Google一下',
    id: Math.round(1000) * Date.now() + 1
  },
  bing: {
    zh: '必应',
    en: 'bing',
    message: '搜索',
    url: (value = null) => {
      return `https://www.bing.com/search?q=${value}`;
    },
    id: Math.round(99) * Date.now() + 1
  },
  baidu: {
    zh: '百度',
    en: 'baidu',
    message: '百度一下',
    url: (value = null) => {
      return `https://www.baidu.com/s?wd=${value}&ie=utf-8`;
    },
    id: Math.round(98) * Date.now() + 1
  }
};

const defaultSearchName = 'google';

export { searchConfig, defaultSearchName };
