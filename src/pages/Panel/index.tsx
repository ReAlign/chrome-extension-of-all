import React from 'react';
import { render } from 'react-dom';

import '@alifd/next/dist/next.css';

import Panel from './Panel';
import './index.scss';

render(<Panel />, window.document.querySelector('#app-panel-container'));
