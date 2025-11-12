import { Inject, Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';

@Injectable()
export class ConfigService {
  constructor(
    private readonly configService: NestConfigService,
    @Inject('JWT_KEY_PAIR')
    private readonly keyPair: CryptoKeyPair,
  ) {}

  getPrivateKey(): CryptoKey {
    const { privateKey } = this.keyPair;
    return privateKey;
  }

  getPublicKeyAsString(): string {
    const publicKeyPath = this.configService.get<string>(
      'JWT_KEY_PUBLIC_PATH',
    )!;
    if (!publicKeyPath) {
      throw new Error(
        'JWT_KEY_PUBLIC_PATH is not set in environment variables',
      );
    }
    return readFileSync(publicKeyPath, 'utf-8');
  }

  get kid(): string {
    return this.configService.get<string>('JWT_KID')!;
  }
  get issuer(): string {
    return this.configService.get<string>('JWT_ISS')!;
  }

  get audience(): string {
    return this.configService.get<string>('JWT_AUD')!;
  }

  get jwtExpiration(): string {
    return this.configService.get<string>('JWT_EXPIRATION')!;
  }
  get jwtRefreshExpiration(): string {
    return this.configService.get<string>('JWT_REFRESH_EXPIRATION')!;
  }

  get tokenOptions() {
    return {
      privateKey: this.getPrivateKey(),
      kid: this.kid,
      jwtExpiration: this.jwtExpiration,
      issuer: this.issuer,
      audience: this.audience,
    };
  }
}
