import { Flex, Input, Stack, useColorModeValue } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { UpdateProfileType } from '@/common/types';
import { useAppSelector } from '@/store/hook';
import FormField from '../ui/FormField';
import AppButton from '../ui/AppButton';

function UpdateProfileForm(): JSX.Element {
  const user = useAppSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileType>({
    defaultValues: {
      username: user.username,
      email: user.email,
      name: user.name,
    },
    mode: 'onTouched',
  });

  return (
    <Flex align="center" justify="center">
      <Stack
        spacing={4}
        w="full"
        maxW="md"
        bg={useColorModeValue('white', 'gray.700')}
        rounded="lg"
        boxShadow="sm"
        p={6}
        my={12}
      >
        <form noValidate>
          <FormField error={errors.name} label="Name">
            <Input {...register('name')} />
          </FormField>
          <FormField error={errors.username} label="Username">
            <Input {...register('username')} />
          </FormField>
          <FormField error={errors.email} label="Email">
            <Input {...register('email')} />
          </FormField>
        </form>

        <AppButton text="Submit" type="submit" />
      </Stack>
    </Flex>
  );
}
export default UpdateProfileForm;
