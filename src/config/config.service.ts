import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtSecrets {
  constructor(private readonly configService: ConfigService) {}

  async getPrivateKey(): Promise<CryptoKey> {
    const keyData = new TextEncoder().encode(
      this.configService.get<string>('JWT_PRIVATE_KEY'),
    );
    return crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'Ed25519', namedCurve: 'Ed25519' },
      true,
      ['sign'],
    );
  }

  get publicKey(): string {
    return this.configService.get<string>('JWT_PUBLIC_KEY')!;
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
    return this.configService.get<string>('JWT_EXPIRES_IN')!;
  }
  get jwtRefreshExpiration(): string {
    return this.configService.get<string>('JWT_REFRESH_EXPIRES_IN')!;
  }
}
