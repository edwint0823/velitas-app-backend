import { HttpException, HttpStatus, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) throw new HttpException({ message: 'Token requerido' }, HttpStatus.UNAUTHORIZED);

    const token = req.headers.authorization.split(' ')[1];
    try {
      const verify = jwt.verify(token, process.env.SECRET_KEY_JWT);
      req.query.user = { ...verify.user, permissions: verify.permissions };
    } catch (e) {
      throw new HttpException({ message: 'Token invalido o expirado' }, HttpStatus.UNAUTHORIZED);
    }
    next();
  }
}
