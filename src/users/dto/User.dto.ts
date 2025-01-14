import { IsEmail, IsNotEmpty } from 'class-validator';
export class User {
  id: number;
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
