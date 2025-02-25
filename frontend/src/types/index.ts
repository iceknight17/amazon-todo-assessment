export interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  categoryId: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
}

export type SortBy = 'dueDate' | 'createdAt';
export type FilterStatus = 'all' | 'active' | 'completed';