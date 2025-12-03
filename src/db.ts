import { Pool } from 'pg';

const pool = new Pool({
  database: process.env.DB_NAME,
});

export default pool;
