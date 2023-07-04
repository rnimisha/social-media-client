import { z } from 'zod';

export const REGISTER_VALIDATION_SCHEMA = z
  .object({
    username: z.string().nonempty('Username is required').min(4, {
      message: 'Username should be atleast 4 characters',
    }),
    password: z
      .string()
      .nonempty('Password is required')
      .min(8, { message: 'Password should be atleast 8 characters' }),
    email: z.string().nonempty('Email is Required').email(),
    name: z
      .string()
      .nonempty('Name is required')
      .min(3, { message: 'Name should be atleast 3 characters' }),
    confirmPass: z.string().nonempty('Confirm your password'),
  })
  .refine((data) => data.confirmPass === data.password, {
    message: "Password don't match",
    path: ['confirmPass'],
  });

export default REGISTER_VALIDATION_SCHEMA;
