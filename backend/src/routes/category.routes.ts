import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';

const router = Router();
const categoryController = new CategoryController();

router.post('/', (req, res, next) => categoryController.create(req, res, next));
router.get('/', (req, res, next) => categoryController.getAll(req, res, next));
router.delete('/:id', (req, res, next) => categoryController.delete(req, res, next));

export default router;