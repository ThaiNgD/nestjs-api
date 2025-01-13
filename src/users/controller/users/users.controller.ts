import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUser } from 'src/users/dto/CreateUser.dto';
import { UsersGuard } from 'src/users/guards/users/users.guard';
import { UsersService } from 'src/users/service/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  @UseGuards(UsersGuard)
  getUsers(@Query('sortDesc', ParseBoolPipe) sortDesc: boolean) {
    console.log(sortDesc);
    return this.userService.fetchUser(sortDesc);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: string) {
    const foundUser = this.userService.findUserByUsername(id);
    if (!foundUser) {
      // throw new HttpException(
      //   `User with id ${id} not found`,
      //   HttpStatus.BAD_REQUEST,
      // );
      throw new BadRequestException('User not found');
    }
    return foundUser;
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createUser(@Body() userData: CreateUser) {
    this.userService.createUser(userData);
    return 'User created successfully';
  }
}
