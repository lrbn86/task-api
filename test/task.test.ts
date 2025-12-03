import request from 'supertest';
import { describe, it, expect, beforeAll } from 'vitest';
import app from '../src/index.js';

describe('Task API', () => {
  let token: string;
  beforeAll(async () => {
    await request(app)
      .post('/v1/auth/register')
      .send({
        email: 'admin@email.com',
        password: 'mypass',
      });
    const res = await request(app)
      .post('/v1/auth/login')
      .send({
        email: 'admin@email.com',
        password: 'mypass',
      });
    token = res.body.data.token;
  });

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/v1/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Task',
        description: 'This is a test task',
      });
    console.log(res.body);
    expect(res.statusCode).toEqual(201);
    expect(res.body.data.task.title).toBe('Test Task');
    expect(res.body.data.task.description).toBe('This is a test task');
  });
});
