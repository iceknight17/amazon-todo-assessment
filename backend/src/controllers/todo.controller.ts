import { Request, Response, NextFunction } from 'express';
import { TodoService } from '../services/todo.service';
import { validateTodo, validatePartialTodo } from '../validators/todo.validator';

export class TodoController {
  private todoService: TodoService;

  constructor() {
    this.todoService = new TodoService();
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const todoData = validateTodo(req.body);
      const todo = await this.todoService.createTodo(todoData);
      res.status(201).json(todo);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, sortBy } = req.query;
      
      let todos;
      if (status === 'completed') {
        todos = await this.todoService.getTodosByStatus(true);
      } else if (status === 'active') {
        todos = await this.todoService.getTodosByStatus(false);
      } else if (sortBy === 'dueDate') {
        const ascending = req.query.order !== 'desc';
        todos = await this.todoService.getTodosByDueDate(ascending);
      } else {
        todos = await this.todoService.getAllTodos();
      }
      
      res.json(todos);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const todoData = validatePartialTodo(req.body);
      const todo = await this.todoService.updateTodo(id, todoData);
      res.json(todo);
    } catch (error) {
      next(error);
    }
  }

  async toggle(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const todo = await this.todoService.getTodoById(id);
      const updatedTodo = await this.todoService.updateTodo(id, {
        completed: todo.completed ? 0 : 1
      });
      res.json(updatedTodo);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      await this.todoService.deleteTodo(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}