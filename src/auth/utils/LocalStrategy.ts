import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/typeorm/entity/User';
import { AuthService } from '../service/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly AuthService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      usernameField: 'email',
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }
  async validate(req: Request, email: string, password: string): Promise<User> {
    const loginUser = {
      email,
      password,
      is_remember: req.body.is_remember,
    };
    return this.AuthService.validateUser(loginUser);
  }
}
