import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password is required'),
});

export default {
  userSchema,
};
