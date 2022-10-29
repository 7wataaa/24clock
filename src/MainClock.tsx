import { Box, Center, Heading } from '@chakra-ui/react';
import { useNowTimeDegree } from './hook/useNowTimeDegree';

const LongHand = ({ angle = 0, ...props }) => {
  return (
    <Box
      w="15px"
      h="40vmin"
      position="absolute"
      top="50%"
      left="50%"
      bgColor="#c8c8c8"
      borderRadius="100rem"
      transformOrigin="bottom center"
      transform={`translate(-50%, -100%) rotate(${angle}deg)`}
      data-testid="LongHand"
      {...props}
    />
  );
};

export const MainClock: React.FC = () => {
  const deg = useNowTimeDegree();

  return (
    <>
      <Center bg="#171717" w="100vw" h="100vh">
        <Heading
          position="absolute"
          transform="translate(0, -40vmin)"
          color="#c8c8c8"
        >
          24
        </Heading>
        <Heading
          position="absolute"
          transform="translate(calc(-40vmin), 0)"
          color="#c8c8c8"
        >
          18
        </Heading>
        <Heading
          position="absolute"
          transform="translate(calc(40vmin), 0)"
          color="#c8c8c8"
        >
          06
        </Heading>
        <Heading
          position="absolute"
          transform="translate(0, calc(40vmin))"
          color="#c8c8c8"
        >
          12
        </Heading>
      </Center>
      <LongHand angle={deg} />
    </>
  );
};
