import { useState } from 'react';
import { useInterval } from 'react-use';

export const useNowTimeDegree = (config = { updateMillisecond: 1000 }) => {
  const dateToDeg = (date: Date): number => {
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return hour * 15 + minutes * 0.25;
  };

  const [deg, setDeg] = useState(0);

  useInterval(() => {
    setDeg(dateToDeg(new Date(Date.now())));
  }, config.updateMillisecond);

  return deg;
};
