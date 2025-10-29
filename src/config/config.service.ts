import { Injectable } from '@nestjs/common';
import { ConfigService as ConfigServiceClass } from '@nestjs/config';
import {
  DbStatusEnum,
  DbStatusResponseI,
} from 'src/interfaces/config.interfaces';
import { DataSource } from 'typeorm';

@Injectable()
export class ConfigService {
  constructor(
    private readonly configService: ConfigServiceClass,
    private readonly dataSource: DataSource,
  ) {}

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

  getLiveness() {
    return {
      ok: true,
      port: `Backend listening on: ${this.configService.get<number>('PORT')}`,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }

  async getReadiness(): Promise<DbStatusResponseI> {
    try {
      await this.dataSource.query('SELECT 1');
      return { db: DbStatusEnum.UP };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e: unknown) {
      return {
        db: DbStatusEnum.DOWN,
      };
    }
  }
}
