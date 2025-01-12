import { IsEmail, IsNotEmpty } from 'class-validator';

export class User {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
