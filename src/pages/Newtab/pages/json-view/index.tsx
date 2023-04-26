import React, { useState } from 'react';
import { Input, Radio } from '@alifd/next';

import { syntaxHighlight } from './_';

import './index.scss';

const list = [
  {
    value: 'news-ui-prod_en',
    label: 'new.s-ui PROD en',
    url: 'https://bin.bnbstatic.com/api/i18n/-/web/cms/en/news-ui',
  },
  {
    value: 'news-ui-prod_zh-CN',
    label: 'new.s-ui PROD zh-CN',
    url: 'https://bin.bnbstatic.com/api/i18n/-/web/cms/zh-CN/news-ui',
  },
  {
    value: 'news-ui-dev_en',
    label: 'new.s-ui DEV en',
    url: 'https://static.devfdg.net/api/i18n/-/web/cms/en/news-ui',
  },
  {
    value: 'news-ui-dev_zh-CN',
    label: 'new.s-ui DEV zh-CN',
    url: 'https://static.devfdg.net/api/i18n/-/web/cms/zh-CN/news-ui',
  },
  {
    value: 'custom',
    label: 'Custom',
    url: '',
  },
];

const UrlMap = list.reduce((prev, item) => {
  // @ts-ignore
  prev[item.value] = item.url;
  return prev;
}, {});

export const JsonView = () => {
  const [radioVal, setRadioVal] = useState('custom');
  const [val, setVal] = useState('');
  const [jsonData, setJsonData] = useState(null);

  const fetchData = async (w: any) => {
    const v = w.trim();

    if (v) {
      try {
        const r = await fetch(`${v}?t=${Date.now()}`);
        const jd = await r.json();
        console.log(jd);
        setJsonData(jd);
      } catch (e) {
        setJsonData(null);
      }
    } else {
      setJsonData(null);
    }
  };

  const onChangeEvt = (v: any) => {
    setVal(v);
  };

  const onRadioGroupChangeEvt = (v: any) => {
    setRadioVal(v);
    // @ts-ignore
    const x = UrlMap[v];
    setVal(x);
    fetchData(x);
  };
  const onPressEnterEvt = () => {
    fetchData(val)
  }

  return (
    <div className="cls-container cls-json-view-container">
      <div className="cls-json-view-inner">
        <Radio.Group
          dataSource={list}
          shape="button"
          className="cls-opacity-20"
          value={radioVal}
          onChange={onRadioGroupChangeEvt}
        />
        <Input
          size="medium"
          placeholder="json url"
          className="cls-opacity-20"
          style={{
            marginTop: '12px',
            width: '100%',
          }}
          disabled={radioVal !== 'custom'}
          onChange={onChangeEvt}
          onPressEnter={onPressEnterEvt}
        />
        {jsonData && (
          <pre
            className="cls-main-txt cls-json-view-pre"
            dangerouslySetInnerHTML={{
              __html: syntaxHighlight(JSON.stringify(jsonData, null, 4)),
            }}
          />
        )}
      </div>
    </div>
  );
};
