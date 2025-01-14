import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { LoginUser } from 'src/auth/dto/LoginUser.dto';
import { RegisterUser } from 'src/auth/dto/RegisterUser.dto';
import { User } from 'src/users/typeorm/entity/User';
import { InsertResult, Repository } from 'typeorm';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async login(loginUser: LoginUser): Promise<User> {
    const user = this.userRepository.findOne({
      where: { email: loginUser.email, password: loginUser.password },
    });

    if (user) {
      return user;
    } else {
      throw new HttpException('Failed', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async register(registerUser: RegisterUser): Promise<InsertResult> {
    const { password } = registerUser;
    const saltOrRounds = process.env.SALT_OR_ROUNDS;
    const hashedPassword = await bcrypt.hash(password, Number(saltOrRounds));
    return await this.userRepository.insert({
      ...registerUser,
      password: hashedPassword,
    });
  }
}
