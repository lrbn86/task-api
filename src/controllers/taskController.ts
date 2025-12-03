import type { Request, Response, NextFunction } from 'express';
import Task from '../models/taskModel.js';
import TaskValidation from '../validation/taskValidation.js';

async function createTask(req: Request, res: Response, next: NextFunction) {
  const { title, description } = TaskValidation.taskSchema.parse(req.body);
  const task = await Task.createTask(title, description);
  return res.status(201).json({ data: { task } });
}

async function getTasks(req: Request, res: Response, next: NextFunction) {
  const tasks = await Task.getAllTasks();
  return res.status(200).json({ data: { tasks } });
}

async function getTask(req: Request, res: Response, next: NextFunction) {
  const id = req?.params?.id;
  const task = await Task.getTaskById(id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  return res.status(200).json({ data: { task } });
}

async function updateTask(req: Request, res: Response, next: NextFunction) {
  const id = req?.params?.id;
  const { title, description, status } = TaskValidation.taskSchema.parse(req.body);
  const task = await Task.updateTask(title, description, status, id);
  if (!task) res.status(404).json({ message: 'Task not found' });
  return res.status(200).json({ data: { task } });
}

async function deleteTask(req: Request, res: Response, next: NextFunction) {
  const id = req?.params?.id;
  const task = await Task.deleteTask(id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  return res.sendStatus(204);
}

export default {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
