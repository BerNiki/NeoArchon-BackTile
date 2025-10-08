import { Module } from '@nestjs/common';
import { MovesModule } from './moves/moves.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfigModule } from './config/config.module';
import * as crypto from 'crypto';
import Joi from 'joi';

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
(global as any).crypto = crypto;

@Module({
  imports: [
    MovesModule,
    AuthModule,
    UsersModule,
    GamesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        DATABASE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().min(12).required(),
        JWT_REFRESH_SECRET: Joi.string().min(12).required(),
        JWT_EXPIRES_IN: Joi.string().default('15m'),
        JWT_REFRESH_EXPIRES_IN: Joi.string().default('2d'),
      }),
      validationOptions: { abortEarly: false },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: true,
      }),
    }),
    JwtConfigModule,
  ],
  providers: [ConfigService],
})
export class AppModule {}
