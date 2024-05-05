import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { HttpExceptionFilter } from '../core/errorsHandlers/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { QueryExceptionFilter } from '../core/errorsHandlers/query-exception.filter';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new QueryExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Velitas App API Server')
    .setDescription('API Server Documentation')
    .setVersion(process.env.APP_VERSION)
    .addTag('order')
    .addTag('customer')
    .addTag('candle_options')
    .addTag('configuration')
    .addTag('bag')
    .addTag('payment')
    .addTag('bank_entity')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, '0.0.0.0', () => {
    console.log(`listening on ${port}`);
  });
}

bootstrap();
