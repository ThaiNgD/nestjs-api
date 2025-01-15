import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/users/typeorm/entity/User';
import { LoginUser } from '../dto/LoginUser.dto';
import { AuthService } from '../service/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly AuthService: AuthService,
  ) {
    super({ usernameField: 'email' });
  }
  async validate(loginUser: LoginUser): Promise<User> {
    console.log(loginUser);
    return this.AuthService.validateUser(loginUser);
  }
}
