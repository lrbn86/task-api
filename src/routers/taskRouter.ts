import { Router } from 'express';
import TaskController from '../controllers/taskController.js';
import authenticate from '../middleware/authenticate.js';

const router = Router();

router.post('/', authenticate, TaskController.createTask);
router.get('/', authenticate, TaskController.getTasks);
router.get('/:id', authenticate, TaskController.getTask);
router.put('/:id', authenticate, TaskController.updateTask);
router.delete('/:id', authenticate, TaskController.deleteTask);

export default router;
