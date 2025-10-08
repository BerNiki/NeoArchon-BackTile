import { Global, Module } from '@nestjs/common';
import { JwtSecrets } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigController } from './config.controller';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: JwtSecrets,
      useFactory: (configService: ConfigService) => {
        return new JwtSecrets(configService);
      },
      inject: [ConfigService],
    },
  ],
  exports: [JwtSecrets, ConfigService],
  controllers: [ConfigController],
})
export class JwtConfigModule {}
