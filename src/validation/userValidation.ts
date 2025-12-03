import { z } from 'zod';

const userSchema = z.object({
  email: z.string().min(6, 'Email is required'),
  password: z.string().min(6, 'Password is required'),
});

export default {
  userSchema,
};
