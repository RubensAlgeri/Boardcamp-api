import chalk from 'chalk';
import pg from 'pg';
import dotenv from 'dotenv'
dotenv.config();

const { Pool } = pg;

const databaseConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}

const connection = new Pool(databaseConfig);

console.log(chalk.bold.blue("Banco de dados Postgres conectado!"));

export default connection;