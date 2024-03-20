import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { config } from '../../config-database';

dotenv.config();
export default new DataSource({
  type: 'postgres',
  ...config[process.env.NODE_ENV],
  entities: [],
  migrationsTableName: 'migrations',
  migrations:
    process.env.NODE_ENV === 'production'
      ? ['./dist/database/migrations/*{.ts,.js}']
      : ['./database/migrations/*{.ts,.js}'],
  // ssl: { rejectUnauthorized: false },
});
