import React from 'react';

const clickDelay = 300;
let lastClick = {
  time: 0,
  target: null as EventTarget | null,
};

export const isDoubleClick = (event: React.MouseEvent, delay: number = clickDelay) => {
  const nowClick = {
    time: event.timeStamp,
    target: event.currentTarget,
  };

  const isDouble = nowClick.target === lastClick.target && nowClick.time - lastClick.time < delay;

  lastClick = nowClick;
  return isDouble;
};
