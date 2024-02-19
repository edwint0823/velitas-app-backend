import { HttpStatus } from '@nestjs/common';

interface ErrorParamsResponse {
  message: string;
  error: Error;
  status: number;
}

export function getErrorParams(error, message: string): ErrorParamsResponse {
  return {
    message: error.message ? error.message : message,
    error: error.errors ? error.errors : error,
    status:
      error.message && error.message === 'Errores de validación'
        ? HttpStatus.BAD_REQUEST
        : HttpStatus.INTERNAL_SERVER_ERROR,
  };
}
