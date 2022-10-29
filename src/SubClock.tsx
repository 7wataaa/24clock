import { Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react';
import { useNowTime } from './hook/useNowTime';

export const SubClock = () => {
  const now = useNowTime();

  const pad = (n: number) => `${n}`.padStart(2, '0');

  const nowHour = pad(now.getHours());
  const nowMinutes = pad(now.getMinutes());
  const nowTime = `${nowHour}${
    now.getSeconds() % 2 === 0 ? ':' : ' '
  }${nowMinutes}`;
  const nowDate = now.toDateString();

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
