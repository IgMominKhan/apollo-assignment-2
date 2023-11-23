import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const addressValidationSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(2),
  country: z.string(),
});

const orderValidationSchema = z.object({
  productName: z.string(),
  quantity: z.number(),
  price: z.number().positive(),
});

const userValidationSchema = z.object({
  userId: z.number().positive('userId must be a positive number'),
  username: z.string(),
  password: z.string(),
  fullName: fullNameValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean().default(true),
  hobbies: z.string().array(),
  address: addressValidationSchema,
  orders: orderValidationSchema.array().optional(),
});

export default userValidationSchema;
