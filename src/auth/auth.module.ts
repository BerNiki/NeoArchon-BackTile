import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { JwtRefreshStrategy } from './jwt/jwt.refreshStrategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'willhideinEnv',
      signOptions: { expiresIn: '15m' },
    }),
    JwtModule.register({
      secret: 'willhideinEnvrefresh',
      signOptions: { expiresIn: '2d' },
    }),
  ],
  providers: [AuthService, UsersService, JwtStrategy, JwtRefreshStrategy],
  controllers: [AuthController],
  exports: [PassportModule],
})
export class AuthModule {}
