import { Pool } from 'pg';

const defaultDatabasePort = process.env.DB_PORT || "5432"

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASSWORD,
	port:  parseInt(defaultDatabasePort),
});


export const query = (sqlStatement: string, params: any[] = []) => pool.query(sqlStatement, params);
