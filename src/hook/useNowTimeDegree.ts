import { useState } from 'react';
import { useInterval } from 'react-use';

/**
 * 現在時刻から24時間式アナログ時計の角度を返す
 * @param {Date} [date=now] 現在時刻を使わない場合の時刻
 * @return {number} 針の角度
 */
export const calcTimeDeg = (date?: Date) => {
  const now = date ?? new Date(Date.now());
  const hour = now.getHours();
  const minutes = now.getMinutes();

  return hour * 15 + minutes * 0.25;
};

export const useNowTimeDegree = (config = { updateMillisecond: 1000 }) => {
  const [nowTimeDegree, setDeg] = useState(calcTimeDeg());

  useInterval(() => {
    setDeg(calcTimeDeg());
  }, config.updateMillisecond);

  return nowTimeDegree;
};
