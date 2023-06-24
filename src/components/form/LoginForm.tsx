import { Box, Input } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoginType, TokenType } from '@/common/types';
import { LOGIN_VALIDATION_SCHEMA } from '@/common/validations';
import useLogin from '@/hooks/useLogin';
import FormField from '../ui/FormField';
import AppButton from '../ui/AppButton';

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(LOGIN_VALIDATION_SCHEMA),
    mode: 'onTouched',
  });
  const onSuccess = (data: TokenType) => {
    // store
    // navigate
  };

  const { mutate: submitLogin } = useLogin({
    onSuccess,
    onError: (err) => {
      console.log(err.response.data);
    },
  });

  const onSubmit: SubmitHandler<LoginType> = (data) => {
    submitLogin(data);
  };

  return (
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
  );
}

export default LoginForm;
