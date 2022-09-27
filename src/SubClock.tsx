import { Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react';
import { useState } from 'react';
import { useInterval } from 'react-use';

export const SubClock = () => {
  const [colon, setColon] = useState(':');
  useInterval(() => {
    setColon(colon === ':' ? ' ' : ':');
  }, 1000);

  const pad = (n: number) => `${n}`.padStart(2, '0');

  const nowHour = pad(new Date(Date.now()).getHours());
  const nowMinutes = pad(new Date(Date.now()).getMinutes());
  const nowTime = `${nowHour}${colon}${nowMinutes}`;
  const nowDate = new Date(Date.now()).toDateString();

  return (
    <Stat
      paddingRight="2rem"
      paddingBottom="1rem"
      position="absolute"
      bottom="0"
      right="0"
      color="#c8c8c8"
    >
      <StatLabel color="#c8c8c8">Now</StatLabel>
      <StatNumber color="#c8c8c8">{nowTime}</StatNumber>
      <StatHelpText color="#c8c8c8">{nowDate}</StatHelpText>
    </Stat>
  );
};
