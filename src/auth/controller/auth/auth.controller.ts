import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Injectable,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RegisterUser } from 'src/auth/dto/RegisterUser.dto';
import { LocalAuthenticationGuard } from 'src/auth/guards/localStrategy/localStrategy.guard';
import { AuthService } from 'src/auth/service/auth/auth.service';
import RequestWithUser from 'src/auth/types/localAuth';

@Controller('auth')
@Injectable()
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Req() req: RequestWithUser) {
    const user = req.user;
    // user.password = undefined;
    return user;
  }

  @Post('register')
  async register(@Body() registerUser: RegisterUser) {
    return this.authService.register(registerUser);
  }
}
