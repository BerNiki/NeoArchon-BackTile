import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JWTPayload, decodeJwt } from 'jose';
import { Logger } from 'nestjs-pino';
import { UsersService } from 'src/api/users/users.service';
import { cookieExtractor } from '../utils/cookieExtractor';
import { verifyPassword } from '../utils/passwordHasher';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  private readonly logger = new Logger();
  constructor(
    private readonly configService: ConfigService,
    @Inject('JWT_KEY_PAIR') private readonly keyPair: CryptoKeyPair,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const { accessToken, refreshToken } = cookieExtractor(request);

    if (!accessToken || !refreshToken) {
      this.logger.warn('No JWT tokens found in cookies');
      return false;
    }
    try {
      const payload: JWTPayload = decodeJwt(accessToken);

      if (!payload || !payload.sub)
        throw new Error('Invalid access token payload!');

      const user = await this.userService.findById(payload.sub);

      if (
        !user ||
        !user.currentHashedRefreshToken ||
        !user.currentHashedRefreshTokenExpiresAt
      )
        throw new Error('User not found or has no refresh token!');

      if (new Date().getSeconds() > user.currentHashedRefreshTokenExpiresAt)
        throw new Error('Refresh token has expired!');

      const isRTokenValid = await verifyPassword(
        user.currentHashedRefreshToken,
        refreshToken,
      );

      if (!isRTokenValid) throw new Error('Invalid Refresh token!');

      request['user'] = user;

      return true;
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.logger.warn(`JWT Verification Failed: ${e.message}`);
      throw new UnauthorizedException('Invalid Token');
    }
  }
}
