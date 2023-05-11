import React, { useEffect, useState } from 'react';

import { fGet } from '../../../../utils/fetch';
import { getToday } from '../../../../utils/date';

import './index.scss';

interface DataItem {
  content: string;
  text: string;
  detailLink: string;
  detailIcon: string;
}

export const Today = () => {
  const [data, setData] = useState<DataItem[]>([]);

  const fetchTodayData = async () => {
    const shanBay = await fGet(
      'https://apiv3.shanbay.com/weapps/dailyquote/quote/'
    );
    const ciba = await fGet(
      `http://sentence.iciba.com/index.php?c=dailysentence&m=getdetail&title=${getToday()}`
    );
    const { data: jinrishici } = await fGet(
      'https://v2.jinrishici.com/one.json'
    );

    setData([
      {
        content: shanBay.content,
        text: shanBay.translation,
        detailIcon: 'https://ssl.gstatic.com/translate/favicon.ico',
        detailLink: `https://translate.google.com/?sl=auto&tl=zh-CN&text=${encodeURIComponent(
          shanBay.content
        )}&op=translate&hl=zh-CN`,
      },
      {
        content: ciba.content,
        text: ciba.note,
        detailIcon: 'https://ssl.gstatic.com/translate/favicon.ico',
        detailLink: `https://translate.google.com/?sl=auto&tl=zh-CN&text=${encodeURIComponent(
          ciba.content
        )}&op=translate&hl=zh-CN`,
      },
      {
        content: jinrishici.content,
        text: `—— 《${jinrishici.origin.title}》${jinrishici.origin.dynasty}·${jinrishici.origin.author}`,
        detailIcon: 'https://so.gushiwen.cn/favicon.ico',
        // detailLink: `https://gushiwen.realign.cn/?gsw_name=${jinrishici.origin.title}`,
        detailLink: `https://so.gushiwen.cn/search.aspx?value=${jinrishici.origin.title}&valuej=${jinrishici.origin.title[0]}`,
      },
    ]);
  };

  const transEvt = (x: DataItem) => {
    window.open(x.detailLink);
  };

  useEffect(() => {
    fetchTodayData();
  }, []);

  return (
    <div
      className="cls-today-container"
      style={{
        opacity: data.length ? '1' : '0',
      }}
    >
      {data.length ? (
        <>
          {data.map((x) => {
            return (
              <div key={x?.detailLink} className="cls-today-item">
                <div className="cls-today-txt cls-today-origin">
                  {x?.content}{' '}
                  {x?.detailLink && x?.detailIcon && (
                    <img
                      className="cls-today-trans"
                      src={x?.detailIcon}
                      alt="translate"
                      onClick={() => {
                        transEvt(x);
                      }}
                    />
                  )}
                </div>
                <div className="cls-today-txt cls-today-translation">
                  {x?.text}
                </div>
              </div>
            );
          })}
        </>
      ) : null}
    </div>
  );
};
