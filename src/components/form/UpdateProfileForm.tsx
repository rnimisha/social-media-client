import {
  Center,
  Flex,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UpdateProfileType } from '@/common/types';
import { useAppSelector } from '@/store/hook';
import useUpdateProfile from '@/hooks/useUpdateProfile';
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

  const { mutate } = useUpdateProfile({});

  const onFormSubmit: SubmitHandler<UpdateProfileType> = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.set(key, data[key as keyof UpdateProfileType]);
    });

    mutate({ data: formData, username: user.username });
  };

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
        <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
          <FormField error={errors.name} label="Name">
            <Input {...register('name')} />
          </FormField>
          <FormField error={errors.username} label="Username">
            <Input {...register('username')} />
          </FormField>
          <FormField error={errors.email} label="Email">
            <Input {...register('email')} />
          </FormField>
          <Center mt={8} w="100%">
            <AppButton text="Submit" type="submit" />
          </Center>
        </form>
      </Stack>
    </Flex>
  );
}
export default UpdateProfileForm;
