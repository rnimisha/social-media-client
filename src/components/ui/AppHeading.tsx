import { Heading } from '@chakra-ui/react';

type propTypes = {
  text: string;
  fontsize?: string;
  color?: string;
};

function AppHeading({ text, fontsize, color }: propTypes) {
  return (
    <Heading as="h1" color={color} fontSize={fontsize}>
      {text}
    </Heading>
  );
}

AppHeading.defaultProps = {
  fontsize: 'clamp(1.8rem, 1.55rem + 0.8vw, 2rem)',
  color: 'primary.300',
};

export default AppHeading;
