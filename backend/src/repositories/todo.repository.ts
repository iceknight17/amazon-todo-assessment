import db from '../database';
import { Todo, CreateTodoDTO, UpdateTodoDTO } from '../types';

export class TodoRepository {
  create(todo: CreateTodoDTO): Todo {
    const stmt = db.prepare(`
      INSERT INTO todos (title, description, due_date, category_id)
      VALUES (@title, @description, @dueDate, @categoryId)
      RETURNING *
    `);
    return stmt.get(todo) as Todo;
  }

  findAll(): Todo[] {
    const stmt = db.prepare('SELECT * FROM todos ORDER BY created_at DESC');
    return stmt.all() as Todo[];
  }

  findById(id: number): Todo | undefined {
    const stmt = db.prepare('SELECT * FROM todos WHERE id = ?');
    return stmt.get(id) as Todo | undefined;
  }

  findByCategory(categoryId: number): Todo[] {
    const stmt = db.prepare('SELECT * FROM todos WHERE category_id = ? ORDER BY created_at DESC');
    return stmt.all(categoryId) as Todo[];
  }

  update(id: number, todo: UpdateTodoDTO): Todo | undefined {
    const current = this.findById(id);
    if (!current) return undefined;

    const updates = Object.entries(todo)
      .filter(([_, value]) => value !== undefined)
      .map(([key]) => `${key} = @${key}`)
      .join(', ');

    const stmt = db.prepare(`
      UPDATE todos 
      SET ${updates}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = @id
      RETURNING *
    `);

    return stmt.get({ ...todo, id }) as Todo;
  }

  delete(id: number): boolean {
    const stmt = db.prepare('DELETE FROM todos WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  findByStatus(completed: boolean): Todo[] {
    const stmt = db.prepare('SELECT * FROM todos WHERE completed = ? ORDER BY created_at DESC');
    return stmt.all(completed) as Todo[];
  }

  findByDueDate(ascending: boolean = true): Todo[] {
    const order = ascending ? 'ASC' : 'DESC';
    const stmt = db.prepare(`SELECT * FROM todos ORDER BY due_date ${order}`);
    return stmt.all() as Todo[];
  }
}