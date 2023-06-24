import { z } from 'zod';

export const LOGIN_VALIDATION_SCHEMA = z.object({
  username: z.string().nonempty('Username is required'),
  password: z.string().nonempty('Password is required'),
});

export default LOGIN_VALIDATION_SCHEMA;
