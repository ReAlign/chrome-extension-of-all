import React, { useEffect, useState } from 'react';
import { Grid } from '@alifd/next';

import { getParsedFavicon } from './../../../../utils/website';

import './index.scss';

const { Row, Col } = Grid;

export const Home = () => {
  const [bookMarks, setBookMarks] = useState<any>(null);
  const [favs, setFavs] = useState<any>([]);

  useEffect(() => {
    chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
      const sql = bookmarkTreeNodes?.[0].children?.[0].children;
      // console.log('bookmarkTreeNodes: ', bookmarkTreeNodes);
      if (sql) {
        setBookMarks(
          sql
            .reduce((prev: any[], x) => {
              if ((x?.title || '').indexOf('b-') === 0) {
                // console.log('x: ', x);
                // @ts-ignore
                prev.push([...x?.children]);
              }
              return prev.flat();
            }, [])
            // .filter((x, i) => i < 4)
            .map((x) => x)
        );
      }
    });
  }, []);

  useEffect(() => {
    if (bookMarks) {
      // @ts-ignore
      Promise.all(bookMarks.map((x) => getParsedFavicon(x?.url))).then(
        (values) => {
          console.log(values);
          setFavs(values);
        }
      );
    }
  }, [bookMarks]);

  return (
    <div
      className="cls-home-container"
      style={{ height: '100%', overflow: 'auto' }}
    >
      <Row wrap>
        {favs && favs.length && (
          <>
            {/* @ts-ignore */}
            {favs.map((fs, idx) => {
              return (
                <Col span="6" className="cls-bookmark-col">
                  <img key={`${idx}-${fs}`} src={fs} alt="" />;
                </Col>
              );
            })}
          </>
        )}
      </Row>
      {/* {bookMarks && <pre>{JSON.stringify(bookMarks, null, 2)}</pre>} */}
    </div>
  );
};
