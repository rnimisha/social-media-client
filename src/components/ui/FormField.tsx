import { FormControl, FormLabel } from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

type PropsType = {
  children: JSX.Element;
  error: FieldError | undefined;
  label: string;
};
function FormField({ children, error, label }: PropsType) {
  return (
    <>
      <FormControl>
        <FormLabel>{label}</FormLabel>
        {children}
      </FormControl>
      {error?.message}
    </>
  );
}

export default FormField;
