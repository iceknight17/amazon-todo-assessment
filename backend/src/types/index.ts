export interface Todo {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  categoryId: number;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoDTO {
  title: string;
  description: string;
  dueDate: string;
  categoryId: number;
}

export interface UpdateTodoDTO {
  title?: string;
  description?: string;
  dueDate?: string;
  categoryId?: number;
  completed?: boolean;
}

export interface CreateCategoryDTO {
  name: string;
}