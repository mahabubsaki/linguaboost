import { z } from 'zod';

// User validation schemas
// export const createUserSchema = z.object({
//   email: z.string().email('Invalid email format'),
//   username: z.string().min(3, 'Username must be at least 3 characters').max(50, 'Username must be less than 50 characters').optional(),
//   firstName: z.string().min(1, 'First name is required').max(100, 'First name must be less than 100 characters').optional(),
//   lastName: z.string().min(1, 'Last name is required').max(100, 'Last name must be less than 100 characters').optional(),
//   avatar: z.string().url('Invalid avatar URL').optional(),
// });

// export const updateUserSchema = createUserSchema.partial();

// export type CreateUser = z.infer<typeof createUserSchema>;
// export type UpdateUser = z.infer<typeof updateUserSchema>;
