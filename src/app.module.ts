import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DEV_PG_APP_VELITAS_HOST,
      port: parseInt(process.env.DEV_PG_APP_VELITAS_PORT),
      username: process.env.DEV_PG_APP_VELITAS_USERNAME,
      password: process.env.DEV_PG_APP_VELITAS_PASSWORD,
      database: process.env.DEV_PG_APP_VELITAS_DATABASE,
      entities: [],
      // ssl: { rejectUnauthorized: false },
      // logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
