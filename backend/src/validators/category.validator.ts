import { z } from 'zod';
import { CreateCategoryDTO } from '../types';
import { AppError } from '../utils/error';

const categorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(50)
});

export function validateCategory(data: unknown): CreateCategoryDTO {
  try {
    return categorySchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new AppError(error.errors[0].message, 400);
    }
    throw error;
  }
}