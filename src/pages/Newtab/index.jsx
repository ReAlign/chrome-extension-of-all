import React from 'react';
import { render } from 'react-dom';
import { injectCss, injectMultiScripts } from '../../utils/dom';

import './index.scss';

import { Home, About, Main, JsonView } from './pages';

import '@alifd/next/dist/next.css';

const CompMap = {
  home: <Home />,
  about: <About />,
  main: <Main />,
  'json-view': <JsonView />,
};
const { cssSet, jsSet, pages } = require('./pages.config.js');

cssSet.forEach((ca) => {
  injectCss(`./${ca}`);
});

injectMultiScripts(jsSet.map((j) => `./${j}`));

pages.forEach(({ id }) => {
  render(CompMap[id], window.document.querySelector(`#j-page-${id}`));
});

window.onerror = function (message, source, lineno, colno, error) {
  const c = 'cls-g-error-show';
  if (document.getElementById('j-g-error').className.indexOf(c) === -1) {
    document.getElementById('j-g-error').className += ` ${c}`;
  }
};

if (module.hot) module.hot.accept();
