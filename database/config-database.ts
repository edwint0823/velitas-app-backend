import * as dotenv from 'dotenv';

dotenv.config();
export const config = {
  development: {
    host: process.env.PG_APP_VELITAS_HOST,
    port: parseInt(process.env.PG_APP_VELITAS_PORT),
    username: process.env.PG_APP_VELITAS_USERNAME,
    password: process.env.PG_APP_VELITAS_PASSWORD,
    database: process.env.PG_APP_VELITAS_DATABASE,
  },
  production: {
    url: process.env.DATABASE_URL,
    extra: {
      ssl: true,
    },
  },
};
