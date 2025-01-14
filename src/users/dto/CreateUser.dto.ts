import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUser {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
