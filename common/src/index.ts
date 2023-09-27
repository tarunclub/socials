import { z } from 'zod';

export const registerSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(6).max(255),
  email: z.string().email().min(6).max(255),
  password: z.string().min(6).max(1024),
  profilePicture: z.string().url().optional(),
  createdAt: z.date().optional(),
});

export const loginSchema = z.object({
  email: z.string().email().min(6).max(255),
  password: z.string().min(6).max(1024),
});

export const updateProfileSchema = z.object({
  name: z.string().min(6).max(255).optional(),
  username: z.string().min(6).max(255).optional(),
  email: z.string().email().min(6).max(255).optional(),
  profilePicture: z.string().url().optional(),
});

export const createPostSchema = z.object({
  description: z.string().min(6).max(255),
  image: z.string().url(),
});

export const createCommentSchema = z.object({
  content: z.string().min(6).max(255),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
export type UpdateProfileSchemaType = z.infer<typeof updateProfileSchema>;
export type CreatePostSchemaType = z.infer<typeof createPostSchema>;
export type CreateCommentSchemaType = z.infer<typeof createCommentSchema>;
