import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginUser } from 'src/auth/dto/LoginUser.dto';
import { RegisterUser } from 'src/auth/dto/RegisterUser.dto';
import { UsersService } from 'src/users/service/users/users.service';
import { User } from 'src/users/typeorm/entity/User';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}

  async validateUser(loginUser: LoginUser): Promise<any> {
    const user = await this.userService.findUserByEmail(loginUser.email);
    if (user && (await bcrypt.compare(loginUser.password, user.password))) {
      console.log('Successfully logined');
      return user;
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  async login(loginUser: LoginUser): Promise<User> {
    const user = this.userService.findUserByEmail(loginUser.email);
    console.log(user);
    if (user) {
      return user[0];
    } else {
      throw new HttpException('Failed', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async register(registerUser: RegisterUser): Promise<boolean> {
    const { password } = registerUser;
    const saltOrRounds = process.env.SALT_OR_ROUNDS;
    const hashedPassword = await bcrypt.hash(password, Number(saltOrRounds));
    return await this.userService.createUser({
      email: registerUser.email,
      password: hashedPassword,
      username: registerUser.email,
    });
  }
}
