import { Router } from 'express';
import { TodoController } from '../controllers/todo.controller';

const router = Router();
const todoController = new TodoController();

router.post('/', (req, res, next) => todoController.create(req, res, next));
router.get('/', (req, res, next) => todoController.getAll(req, res, next));
router.put('/:id', (req, res, next) => todoController.update(req, res, next));
router.patch('/:id', (req, res, next) => todoController.toggle(req, res, next));
router.delete('/:id', (req, res, next) => todoController.delete(req, res, next));

export default router;