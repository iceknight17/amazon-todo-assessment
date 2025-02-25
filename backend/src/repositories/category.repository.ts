import db from '../database';
import { Category, CreateCategoryDTO } from '../types';

export class CategoryRepository {
  create(category: CreateCategoryDTO): Category {
    const stmt = db.prepare(`
      INSERT INTO categories (name)
      VALUES (@name)
      RETURNING *
    `);
    return stmt.get(category) as Category;
  }

  findAll(): Category[] {
    const stmt = db.prepare('SELECT * FROM categories ORDER BY name ASC');
    return stmt.all() as Category[];
  }

  findById(id: number): Category | undefined {
    const stmt = db.prepare('SELECT * FROM categories WHERE id = ?');
    return stmt.get(id) as Category | undefined;
  }

  delete(id: number): boolean {
    const stmt = db.prepare('DELETE FROM categories WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }
}