import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './users/typeorm/entity/User';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.DB_URL,
      // host: process.env.DB_HOST || 'localhost',
      // port: 3306,
      // username: process.env.DB_USERNAME || 'root',
      // password: process.env.DB_PASSWORD || 'Th@i19052001',
      // database: process.env.DB_NAME || 'nestjs-api',
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
