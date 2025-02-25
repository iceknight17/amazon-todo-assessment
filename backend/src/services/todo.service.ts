import { TodoRepository } from '../repositories/todo.repository';
import { CategoryRepository } from '../repositories/category.repository';
import { CreateTodoDTO, UpdateTodoDTO, Todo } from '../types';
import { AppError } from '../utils/error';

export class TodoService {
  private todoRepo: TodoRepository;
  private categoryRepo: CategoryRepository;

  constructor() {
    this.todoRepo = new TodoRepository();
    this.categoryRepo = new CategoryRepository();
  }

  async createTodo(todo: CreateTodoDTO): Promise<Todo> {
    const category = this.categoryRepo.findById(todo.categoryId);
    if (!category) {
      throw new AppError('Category not found', 404);
    }
    return this.todoRepo.create(todo);
  }

  async getAllTodos(): Promise<Todo[]> {
    return this.todoRepo.findAll();
  }

  async getTodoById(id: number): Promise<Todo> {
    const todo = this.todoRepo.findById(id);
    if (!todo) {
      throw new AppError('Todo not found', 404);
    }
    return todo;
  }

  async updateTodo(id: number, todo: UpdateTodoDTO): Promise<Todo> {
    if (todo.categoryId) {
      const category = this.categoryRepo.findById(todo.categoryId);
      if (!category) {
        throw new AppError('Category not found', 404);
      }
    }

    const updated = this.todoRepo.update(id, {
      title: todo.title,
      description: todo.description,
      due_date: todo.dueDate,
      category_id: todo.categoryId,
      completed: parseInt(todo.completed)
    });
    if (!updated) {
      throw new AppError('Todo not found', 404);
    }
    return updated;
  }

  async deleteTodo(id: number): Promise<void> {
    const success = this.todoRepo.delete(id);
    if (!success) {
      throw new AppError('Todo not found', 404);
    }
  }

  async getTodosByCategory(categoryId: number): Promise<Todo[]> {
    const category = this.categoryRepo.findById(categoryId);
    if (!category) {
      throw new AppError('Category not found', 404);
    }
    return this.todoRepo.findByCategory(categoryId);
  }

  async getTodosByStatus(completed: boolean): Promise<Todo[]> {
    return this.todoRepo.findByStatus(completed);
  }

  async getTodosByDueDate(ascending: boolean = true): Promise<Todo[]> {
    return this.todoRepo.findByDueDate(ascending);
  }
}