import { useState } from 'react';
import { useInterval } from 'react-use';

export const useNowTime = (config = { updateMillisecond: 1000 }) => {
  const [nowDate, setNowDate] = useState(new Date());

  useInterval(() => {
    setNowDate(new Date());
  }, config.updateMillisecond);

  return nowDate;
};
