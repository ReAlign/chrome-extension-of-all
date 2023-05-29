const loginLiveAdmin = () => {
  if (window.location.href === 'https://live-admin.fe.qa1fdg.net/') {
    document.cookie =
      'session=6hnZ9zqqHGCmenWLg1T6s1; expires=Fri, 31 Dec 2068 23:59:59 GMT; path=/';
    window.location.reload();
  }
};

const removeBingAd = () => {
  const webUrl = window.location.href;
  if (webUrl.indexOf('https://cn.bing.com/search') === 0) {
    const ads = document.querySelectorAll('li.b_ad');
    if (ads) {
      [].forEach.call(ads, (ad) => {
        ad.style.display = 'none';
      });
    }
  }
};

const removeBaiduAd = () => {
  const webUrl = window.location.href;
  if (webUrl.indexOf('https://www.baidu.com/s') === 0) {
    const ads = document.querySelector('#content_left > div:nth-child(1)');
    if (ads) {
      ads.style.display = 'none';
    }
  }
};

const redirectLocalhostHttps = () => {
  const href = window.location.href;
  if (href.startsWith('https://localhost')) {
    window.location.href = `http${href.substring(5)}`;
  }
};

export const runModules = () => {
  loginLiveAdmin();
  removeBingAd();
  removeBaiduAd();
  redirectLocalhostHttps();
};
