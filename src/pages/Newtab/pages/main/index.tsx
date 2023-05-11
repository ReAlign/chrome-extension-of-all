import React from 'react';

import { Clock } from '../../components/Clock';
import { Today } from '../../components/Today';

import './index.scss';

export const Main = () => {
  return (
    <div className="cls-container cls-main-container">
      <div className="cls-main-clock">
        <Clock />
      </div>
      <div className="cls-main-today">
        <Today />
      </div>
    </div>
  );
};