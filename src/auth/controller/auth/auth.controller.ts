import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Injectable,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { RegisterUser } from 'src/auth/dto/RegisterUser.dto';
import { LocalAuthenticationGuard } from 'src/auth/guards/localStrategy/localStrategy.guard';
import { AuthService } from 'src/auth/service/auth/auth.service';
import RequestWithUser from 'src/auth/types/localAuth';

@Controller('auth')
@Injectable()
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Req() req: RequestWithUser) {
    const user = req.body;
    const headers = await this.authService.generateToken(user);
    return { user: user, headers: headers };
  }

  @Post('register')
  async register(@Body() registerUser: RegisterUser) {
    return this.authService.register(registerUser);
  }

  @UseGuards(LocalAuthenticationGuard)
  @Post('logout')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }
}
