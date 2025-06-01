import { z } from 'zod';

export const PostCreateSchema = z.object({
  title: z.string().min(5, 'Title is required'),
  content: z.string().min(5, 'Content is required'),
  authorId: z.number().int().positive('Author ID must be a positive integer'),
});
