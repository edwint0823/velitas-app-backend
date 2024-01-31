import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
export default new DataSource({
  type: 'postgres',
  host: process.env.DEV_PG_APP_VELITAS_HOST,
  port: parseInt(process.env.DEV_PG_APP_VELITAS_PORT),
  username: process.env.DEV_PG_APP_VELITAS_USERNAME,
  password: process.env.DEV_PG_APP_VELITAS_PASSWORD,
  database: process.env.DEV_PG_APP_VELITAS_DATABASE,
  entities: [],
  migrationsTableName: 'migrations',
  migrations: ['./database/migrations/*.ts'],
  // ssl: { rejectUnauthorized: false },
});
