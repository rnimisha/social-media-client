import { Button, Text } from '@chakra-ui/react';

type PropsType = {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};
function AppButton({ text, type, disabled }: PropsType) {
  return (
    <Button
      color="white"
      backgroundColor="primary.300"
      minW="110px"
      type={type}
      disabled={disabled}
    >
      <Text fontSize="1.2rem">{text}</Text>
    </Button>
  );
}

AppButton.defaultProps = {
  type: 'button',
  disabled: false,
};
export default AppButton;
