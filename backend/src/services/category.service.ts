import { CategoryRepository } from '../repositories/category.repository';
import { CreateCategoryDTO, Category } from '../types';
import { AppError } from '../utils/error';

export class CategoryService {
  private categoryRepo: CategoryRepository;

  constructor() {
    this.categoryRepo = new CategoryRepository();
  }

  async createCategory(category: CreateCategoryDTO): Promise<Category> {
    return this.categoryRepo.create(category);
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepo.findAll();
  }

  async getCategoryById(id: number): Promise<Category> {
    const category = this.categoryRepo.findById(id);
    if (!category) {
      throw new AppError('Category not found', 404);
    }
    return category;
  }

  async deleteCategory(id: number): Promise<void> {
    const success = this.categoryRepo.delete(id);
    if (!success) {
      throw new AppError('Category not found', 404);
    }
  }
}