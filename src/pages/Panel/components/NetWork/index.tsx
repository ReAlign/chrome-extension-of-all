import React from 'react';

import { Button, Table } from '@alifd/next';

import './index.scss';

const TabDemo: React.FC = () => {
  const [list, setList] = React.useState<any[]>([]);
  React.useEffect(() => {
    chrome.devtools.network.onRequestFinished.addListener((req) => {
      if (req.request.url.endsWith('.m3u8')) {
        setList([...list, { url: req.request.url }]);
      }
    });
  });

  const renderName = (value: any, index: any, record: any) => {
    return <span>{record.url}</span>;
  };

  const renderOptions = (value: any, index: any, record: any) => {
    return (
      <div className="network_table_opts_cell">
        <Button type="primary" text onClick={() => {}}>Copy</Button>
        <Button type="primary" text onClick={() => {
          window.open(`https://re-player.realign.cn/player?x=${window.btoa(encodeURIComponent(JSON.stringify(record.url)))}`)
        }}>Open</Button>
      </div>
    );
  };

  return (
    <div className="tab-network-container">
      <Table dataSource={list}>
        <Table.Column title="Url" cell={renderName} />
        <Table.Column title="Options" width="200px" cell={renderOptions} />
      </Table>
    </div>
  );
};

export default TabDemo;
