import React from 'react';

import Tabs from './components/Tabs';

import './Panel.scss';

const Panel: React.FC = () => {
  // React.useEffect(() => {
  //   // @ts-ignore
  //   const updateCountEvt = (tabId, changeInfo, tab) => {
  //     console.log(changeInfo, tab);
  //     if (changeInfo.status === 'complete' && tab.active) {
  //       window.location.reload();
  //     }
  //   }

  //   // @ts-ignore
  //   chrome.tabs.onUpdated.addListener(updateCountEvt)

  //   return () => {
  //     chrome.tabs.onUpdated.removeListener(updateCountEvt)
  //   }
  // }, []);

  return (
    <div className="panel-container">
      <Tabs />
    </div>
  );
};

export default Panel;
