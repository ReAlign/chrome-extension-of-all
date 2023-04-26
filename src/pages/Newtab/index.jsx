import React from 'react';
import { render } from 'react-dom';
import { injectCss, injectMultiScripts } from '../../utils/dom';

import { Home, About, Clock, JsonView } from './pages';

import '@alifd/next/dist/next.css';
import './index.scss';

const CompMap = {
  home: <Home />,
  about: <About />,
  clock: <Clock />,
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
