import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new HttpException('No authorized', HttpStatus.UNAUTHORIZED);
    }
    if (authorization === process.env.NEST_TOKEN) {
      const token = authorization.split(' ')[1];
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
