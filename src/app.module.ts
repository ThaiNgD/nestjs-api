import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { LocalAuthenticationGuard } from './auth/guards/localStrategy/localStrategy.guard';
import { FormationModule } from './formation/formation.module';
import { User } from './users/typeorm/entity/User';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        //...
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
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
    FormationModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: LocalAuthenticationGuard, // Register guard globally
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
