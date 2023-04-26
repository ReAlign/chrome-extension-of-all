export const injectCss = (cssSrc: string = '') => {
  const link = document.createElement('link');
  link.href = cssSrc;
  link.rel = 'stylesheet';

  document.head.append(link);
};

export const injectScript = (jsSrc: string = '') =>
  new Promise((rs, rj) => {
    const s = document.createElement('script');
    s.src = jsSrc;
    s.addEventListener('load', rs);
    s.addEventListener('error', (e) => rj(e.error));
    document.head.appendChild(s);
  });

// export const injectScript = () =>
//   new Promise<void>((rs, rj) => {
//     setTimeout(() => {
//       rs()
//     }, Math.floor(Math.random() * 100))
//   })

export const injectMultiScripts = (jsSrcArr: string[] = []) => {
  return new Promise<void>((rs, rj) => {
    Promise.all(jsSrcArr.map((jsSrc) => injectScript(jsSrc)))
      .then(() => {
        rs();
      })
      .catch((error) => {
        console.log(error);
        rj();
      });
  });
};
