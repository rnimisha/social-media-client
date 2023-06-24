import { Box, Input } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoginType } from '@/common/types';
import { LOGIN_VALIDATION_SCHEMA } from '@/common/validations';
import FormField from '../ui/FormField';
import AppButton from '../ui/AppButton';

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginType>({
    resolver: zodResolver(LOGIN_VALIDATION_SCHEMA),
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<LoginType> = (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormField error={errors.username} label="Username">
          <Input {...register('username')} />
        </FormField>

        <FormField error={errors.password} label="Password">
          <Input type="password" {...register('password')} />
        </FormField>

        <Box mb="20px" />
        <AppButton text="Login" type="submit" />
      </form>
      {/* <DevTool control={control} /> */}
    </>
  );
}

export default LoginForm;
