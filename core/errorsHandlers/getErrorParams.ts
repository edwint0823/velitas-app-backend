import { HttpStatus } from '@nestjs/common';

interface ErrorParamsResponse {
  message: string;
  error: Error;
  status: number;
}

export function getErrorParams(error, message: string): ErrorParamsResponse {
  let status = HttpStatus.INTERNAL_SERVER_ERROR;
  if (![undefined, null, ''].includes(error.status)) {
    status = error.status;
  } else if (error.message && error.message === 'Errores de validación') {
    status = HttpStatus.BAD_REQUEST;
  }
  return {
    message: error.message ? error.message : message,
    error: error.errors ? error.errors : error,
    status: status,
  };
}
