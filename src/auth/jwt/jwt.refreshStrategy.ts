import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';
import { JwtPayload } from './jwt.payload.interface';
import * as bcrypt from 'bcrypt';
import {
  REFRESH_TOKEN_INVALID,
  REFRESH_TOKEN_MISSING,
} from 'src/CONSTS/authErrorMessages';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET')!,
      passReqToCallback: true,
    });
  }

  async validate(
    req: { headers: { authorization: string } },
    payload: JwtPayload,
  ): Promise<User> {
    const user = await this.usersService.findByEmail(payload.email);

    if (!user || !user.currentHashedRefreshToken) {
      throw new UnauthorizedException(REFRESH_TOKEN_MISSING);
    }

    const authHeader = req.headers.authorization;
    const rawToken = authHeader.split(' ')[1];

    const tokenMatches = await bcrypt.compare(
      rawToken,
      user.currentHashedRefreshToken,
    );

    if (!tokenMatches) {
      throw new UnauthorizedException(REFRESH_TOKEN_INVALID);
    }

    return user;
  }
}
