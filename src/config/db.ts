import mariadb, { PoolConnection } from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mariadb.createPool({
  host: process.env.MYSQL_DB_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  bigIntAsNumber: false,
  connectionLimit: 10, // Adjust the connection limit as needed
  acquireTimeout: 20000, // Increase the acquire timeout if needed
});

export const getConnection = async (): Promise<PoolConnection> => {
  try {
    console.log('Connected to mariadb');
    return await pool.getConnection();
  } catch (error: any) {
    console.log('error', error.message);
    throw error; // It's better to throw the error to handle it in the calling code
  }
};
