import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(@Query('sortBy') sortBy: string) {
    console.log(sortBy);
    return {
      username: 'Đình Thái',
      password: 'Th@i1905',
    };
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return {
      id,
      username: 'Thái Thanh',
      password: 'Th@i1905',
    };
  }

  @Get('users/create')
  createUser() {
    return 'Create a new user';
  }
}
