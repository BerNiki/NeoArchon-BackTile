import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/api/users/entities/users.entity';
import { UsersService } from 'src/api/users/users.service';
import { ConfigModule } from 'src/config/config.module';
import { jwtKeysProvider } from './utils/jwt.keys.provider';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule],
  providers: [
    AuthService,
    UsersService,
    jwtKeysProvider,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
  controllers: [AuthController],
  exports: [AuthService, jwtKeysProvider],
})
export class AuthModule {}
