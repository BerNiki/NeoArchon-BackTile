import { Module } from '@nestjs/common';
import { JwtSecrets } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
  exports: [JwtSecrets],
})
export class JwtConfigModule {}
