import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new HttpException('No authorized', HttpStatus.UNAUTHORIZED);
    }
    if (authorization === 'dddd') {
      const token = authorization.split(' ')[1];
      // Verify token and extract user data
      //...
      // Store user data in req.user
      // req.user = { id: 1, username: 'john' };
      console.log(token);
      next();
    } else {
      throw new HttpException(
        'Invalid Authorization Token',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
