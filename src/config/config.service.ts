import { Inject, Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { DataSource } from 'typeorm';

@Injectable()
export class ConfigService {
  constructor(
    private readonly configService: NestConfigService,
    private readonly dataSource: DataSource,
    @Inject('JWT_KEY_PAIR')
    private readonly keyPair: CryptoKeyPair,
  ) {}

  getPrivateKey(): CryptoKey {
    const { privateKey } = this.keyPair;
    return privateKey;
  }

  getPublicKeyAsString(): string {
    const publicKeyPath = process.env.JWT_KEY_PUBLIC_PATH;
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
