import React from 'react';
import { createRoot } from 'react-dom/client';

import '@alifd/next/dist/next.css';

import Panel from './Panel';
import './index.scss';

const container = document.getElementById('app-panel-container');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<Panel />);
