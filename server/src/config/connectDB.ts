import mysql from 'mysql';

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
});
