import { Global, Module } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  ConfigService as NestConfigService,
} from '@nestjs/config';
import { ConfigService } from './config.service';
import { DataSource } from 'typeorm';

@Global()
@Module({
  imports: [NestConfigModule],
  providers: [
    {
      provide: ConfigService,
      useFactory: (nestConfig: NestConfigService, keyPair: CryptoKeyPair) =>
        new ConfigService(nestConfig, keyPair),
      inject: [NestConfigService, DataSource, 'JWT_KEY_PAIR'],
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
