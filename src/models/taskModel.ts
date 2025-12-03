import db from '../db.js';

async function createTask(title: string, description?: string): Promise<object> {
  const query = 'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *';
  const params = [title, description];
  const { rows } = await db.query(query, params);
  return rows[0];
}

async function getAllTasks(): Promise<object[]> {
  const query = 'SELECT * FROM tasks ORDER BY created_at DESC';
  const { rows } = await db.query(query);
  return rows;
}

async function getTaskById(id?: string): Promise<object> {
  const query = 'SELECT * FROM tasks WHERE id=$1';
  const params = [id];
  const { rows } = await db.query(query, params);
  return rows[0];
}

async function updateTask(title: string, description?: string, status?: string, id?: string): Promise<object> {
  const query = 'UPDATE tasks SET title=$1, description=$2, status=$3, updated_at=NOW() WHERE id=$4 RETURNING *';
  const params = [title, description, status, id];
  const { rows } = await db.query(query, params);
  return rows[0];
}

async function deleteTask(id?: string): Promise<object> {
  const query = 'DELETE FROM tasks WHERE id=$1 RETURNING *';
  const params = [id];
  const { rows } = await db.query(query, params);
  return rows[0];
}

export default {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
