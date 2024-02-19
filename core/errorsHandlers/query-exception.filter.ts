import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(QueryExceptionFilter.name);

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    this.logger.error(exception.message, {
      query: exception.query,
      // parameters: exception.parameters,
      // stack: exception.stack,
      // driverError: exception.driverError,
    });

    const { url } = request;
    const { name } = exception;
    const errorResponse = {
      path: url,
      timestamp: new Date().toISOString(),
      message: name,
    };
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}
