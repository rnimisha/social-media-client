import { RegisterType } from '@/common/types';
import { Input, Box } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormField from '../ui/FormField';
import AppButton from '../ui/AppButton';

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterType>({ mode: 'onTouched' });

  const onFormSubmit: SubmitHandler<RegisterType> = (data) => {
    console.log(data);
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
