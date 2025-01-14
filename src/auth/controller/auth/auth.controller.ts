import { Body, Controller, Post } from '@nestjs/common';
import { LoginUser } from 'src/auth/dto/LoginUser.dto';
import { RegisterUser } from 'src/auth/dto/RegisterUser.dto';
import { AuthService } from 'src/auth/service/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginUser: LoginUser) {
    return this.authService.login(loginUser);
  }

  @Post('register')
  register(@Body() registerUser: RegisterUser) {
    return this.authService.register(registerUser);
  }
}
