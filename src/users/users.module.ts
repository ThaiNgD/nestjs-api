import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controller/users/users.controller';
import { UsersMiddleware } from './middleware/users/users.middleware';
import { UsersService } from './service/users/users.service';
import { User } from './typeorm/entity/User';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, User],
  exports: [TypeOrmModule],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UsersMiddleware).forRoutes('users');
  }
}
