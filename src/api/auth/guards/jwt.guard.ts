import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { jwtVerify, JWTPayload } from 'jose';
import { Logger } from 'nestjs-pino';
import { UsersService } from 'src/api/users/users.service';
import { cookieExtractor } from '../utils/cookieExtractor';

@Injectable()
export class JwtGuard implements CanActivate {
  private readonly logger = new Logger();
  constructor(
    private readonly configService: ConfigService,
    @Inject('JWT_KEY_PAIR') private readonly keyPair: CryptoKeyPair,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const { accessToken } = cookieExtractor(request);
    if (!accessToken) {
      this.logger.warn('No JWT token found in cookies');
      return false;
    }
    try {
      const publicKey = this.keyPair.publicKey;
      const issuer = this.configService.get<string>('JWT_ISSUER');
      const audience = this.configService.get<string>('JWT_AUDIENCE');

      const { payload }: { payload: JWTPayload } = await jwtVerify(
        accessToken,
        publicKey,
        {
          issuer,
          audience,
          algorithms: ['EdDSA'],
        },
      );

      if (!payload.sub) throw new Error('Invalid payload!');
      console.log(payload.sub);
      const user = await this.userService.findById(payload.sub);
      request['user'] = user;

      return true;
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.logger.warn(`JWT Verification Failed: ${e.message}`);
      throw new UnauthorizedException('Invalid Token');
    }
  }
}
