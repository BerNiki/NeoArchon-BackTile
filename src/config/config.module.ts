import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import {
  ConfigModule as ConfigModuleClass,
  ConfigService as ConfigServiceClass,
} from '@nestjs/config';
import { ConfigController } from './config.controller';
import { DataSource } from 'typeorm';

@Global()
@Module({
  imports: [ConfigModuleClass],
  providers: [
    {
      provide: ConfigService,
      useFactory: (
        configService: ConfigServiceClass,
        dataSource: DataSource,
      ) => {
        return new ConfigService(configService, dataSource);
      },
      inject: [ConfigService],
    },
  ],
  exports: [ConfigService, ConfigServiceClass],
  controllers: [ConfigController],
})
export class ConfigModule {}
