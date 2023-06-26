import React from 'react';

import { Tab, Switch } from '@alifd/next';

import NetWork from '../NetWork';

const NavCls = 'j-c-tab-nav-cls';
const TabList = [
  {
    title: 'NetWork',
    key: 'network',
    comp: <NetWork />,
  },
];

const Tabs: React.FC = () => {
  return (
    <div className="tabs-container">
      <Tab
        lazyLoad={false}
        navClassName={NavCls}
        extra={
          <Switch
            autoWidth
            size="small"
            checkedChildren="🌞"
            unCheckedChildren="🌛"
            defaultChecked
            onChange={(checked: boolean) => {
              const Container = document.body;
              const ExtraC: HTMLElement | null = document.querySelector(`.${NavCls}`);

              if (Container && ExtraC) {
                Container.style.filter = checked ? '' : 'invert(100%)';
                ExtraC.style.filter = checked ? '' : 'invert(100%)';
              }
            }}
          />
        }
      >
        {TabList.map((item, idx) => {
          return (
            <Tab.Item title={item.title} key={item.key}>
              {item.comp}
            </Tab.Item>
          );
        })}
      </Tab>
    </div>
  );
};

export default Tabs;
