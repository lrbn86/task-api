import db from '../db.js';

async function createUser(email: string, password: string): Promise<object> {
  const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at, updated_at';
  const params = [email, password];
  const { rows: [user] } = await db.query(query, params);
  return user;
}

async function getUserByEmail(email: string) {
  const query = 'SELECT * FROM users where email=$1';
  const params = [email];
  const { rows: [user] } = await db.query(query, params);
  return user;
}

export default {
  createUser,
  getUserByEmail,
};
