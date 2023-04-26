import React, { useEffect } from 'react';

import './index.scss';

const ClsPre = 'cls-clock-';

export const Clock = () => {
  useEffect(() => {
    // Just noticed accessing localStorage is banned from codepen, so disabling saving theme to localStorage
    const deg = 6;
    const hour = document.querySelector(`.${ClsPre}hour`);
    const min = document.querySelector(`.${ClsPre}min`);
    const sec = document.querySelector(`.${ClsPre}sec`);

    const setClock = () => {
      let day = new Date();
      let hh = day.getHours() * 30;
      let mm = day.getMinutes() * deg;
      let ss = day.getSeconds() * deg;

      // @ts-ignore
      hour.style.transform = `rotateZ(${hh + mm / 12}deg)`;
      // @ts-ignore
      min.style.transform = `rotateZ(${mm}deg)`;
      // @ts-ignore
      sec.style.transform = `rotateZ(${ss}deg)`;
    };

    // first time
    setClock();
    // Update every 1000 ms
    setInterval(setClock, 1000);
  }, []);
  return (
    <div className="cls-container cls-clock-container">
      <div className="cls-clock-clock">
        <div className="cls-clock-hour" />
        <div className="cls-clock-min" />
        <div className="cls-clock-sec" />
      </div>
    </div>
  );
};