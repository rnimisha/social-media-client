import { Button, Text } from '@chakra-ui/react';

type PropsType = {
  text: string;
  type?: 'button' | 'submit' | 'reset';
};
function AppButton({ text, type }: PropsType) {
  return (
    <Button
      color="white"
      backgroundColor="primary.300"
      minW="110px"
      type={type}
    >
      <Text fontSize="1.2rem">{text}</Text>
    </Button>
  );
}

AppButton.defaultProps = {
  type: 'button',
};
export default AppButton;
