import { FormControl, FormLabel, Text } from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

type PropsType = {
  children: JSX.Element;
  error: FieldError | undefined;
  label: string;
};
function FormField({ children, error, label }: PropsType) {
  return (
    <>
      <FormControl mt="10px">
        <FormLabel color="primary.300">{label}</FormLabel>
        {children}
      </FormControl>
      <Text color="tomato">{error?.message}</Text>
    </>
  );
}

export default FormField;
