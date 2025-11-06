import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from 'nestjs-pino';

import { MovesModule } from './api/moves/moves.module';
import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';
import { GamesModule } from './api/games/games.module';
import { ConfigModule } from './config/config.module';
import { HealthModule } from './api/health/health.module';

import { CorrelationIdMiddleware } from './common/middleware/correlation-id.middleware';

import {
  CONFIG_MODULE_OPTIONS,
  LOGGER_MODULE_OPTIONS,
  TYPEORM_MODULE_OPTIONS,
} from './shared/consts/app-module-consts/appModuleOptions';

@Module({
  imports: [
    MovesModule,
    AuthModule,
    UsersModule,
    GamesModule,
    ConfigModule,
    NestConfigModule.forRoot(CONFIG_MODULE_OPTIONS),
    TypeOrmModule.forRootAsync(TYPEORM_MODULE_OPTIONS),
    LoggerModule.forRoot(LOGGER_MODULE_OPTIONS),
    HealthModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
