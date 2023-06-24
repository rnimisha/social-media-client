import { Box, Input, useToast } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { LoginType, TokenType } from '@/common/types';
import { LOGIN_VALIDATION_SCHEMA } from '@/common/validations';

import useLogin from '@/hooks/useLogin';

import { useAppDispatch } from '@/store/hook';
import { setAuthData } from '@/features/authSlice';
import FormField from '../ui/FormField';
import AppButton from '../ui/AppButton';

function LoginForm() {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>({
    resolver: zodResolver(LOGIN_VALIDATION_SCHEMA),
    mode: 'onTouched',
  });
  const onSuccess = (data: TokenType) => {
    dispatch(setAuthData(data));
    navigate('/');
  };

  const { mutate: submitLogin } = useLogin({
    onSuccess,
    onError: (err) => {
      toast({
        title: 'Login Error',
        description: err.response.data.message || 'Unexpected Error',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
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
      <AppButton text="Login" type="submit" disabled={isSubmitting} />
    </form>
  );
}

export default LoginForm;
