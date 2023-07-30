import React from 'react';
import { Tab } from '@alifd/next';

import { TAB_ITEM } from './config';

import './index.scss';

export const Popup = () => {
  return (
    <div className="cls-popup-container">
      <Tab size="small">
        {TAB_ITEM.map(({ label, comp }) => {
          return (
            <Tab.Item key={label} title={label}>
              {comp}
            </Tab.Item>
          );
        })}
      </Tab>
    </div>
  );
};
