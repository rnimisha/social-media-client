import { RegisterType } from '@/common/types';
import { Input, Box, useToast } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { REGISTER_VALIDATION_SCHEMA } from '@/common/validations';
import { useMutation } from '@tanstack/react-query';
import { registerService } from '@/common/services';
import { useNavigate } from 'react-router-dom';
import FormField from '../ui/FormField';
import AppButton from '../ui/AppButton';

function RegisterForm() {
  const toast = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterType>({
    resolver: zodResolver(REGISTER_VALIDATION_SCHEMA),
    mode: 'onTouched',
  });

  const { mutate } = useMutation(registerService, {
    onSuccess: () => {
      toast({
        title: 'Registered Successfully',
        description: 'You can now login',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });
      navigate('/login');
    },
    onError: (err: Error) => {
      const e = JSON.parse(err.message);
      toast({
        title: 'Login Error',
        description: e.message || 'Unexpected Error',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    },
  });

  const onFormSubmit: SubmitHandler<RegisterType> = (data) => {
    const { confirmPass, ...otherData } = data;
    mutate(otherData);
  };
  return (
    <form noValidate onSubmit={handleSubmit(onFormSubmit)}>
      <FormField error={errors.name} label="Name">
        <Input {...register('name')} />
      </FormField>
      <FormField error={errors.username} label="Username">
        <Input {...register('username')} />
      </FormField>
      <FormField error={errors.email} label="Email">
        <Input {...register('email')} />
      </FormField>
      <FormField error={errors.password} label="Password">
        <Input type="password" {...register('password')} />
      </FormField>
      <FormField error={errors.confirmPass} label="Confirm Password">
        <Input type="password" {...register('confirmPass')} />
      </FormField>
      <Box mb="20px" />
      <AppButton text="Register" type="submit" disabled={isSubmitting} />
    </form>
  );
}

export default RegisterForm;
