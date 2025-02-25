import { z } from 'zod';
import { CreateTodoDTO, UpdateTodoDTO } from '../types';
import { AppError } from '../utils/error';

const countableStringSchema = z.string().refine(value => !isNaN(Number(value)), {
  message: "String must be countable (a valid number)."
});

const todoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().max(500).optional(),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  categoryId: z.union([z.number(), countableStringSchema])
});

const partialTodoSchema = todoSchema.partial().extend({
  completed: z.boolean().optional()
});

export function validateTodo(data: unknown): CreateTodoDTO {
  try {
    return todoSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new AppError(error.errors[0].message, 400);
    }
    throw error;
  }
}

export function validatePartialTodo(data: unknown): UpdateTodoDTO {
  try {
    return partialTodoSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new AppError(error.errors[0].message, 400);
    }
    throw error;
  }
}