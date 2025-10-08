import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('config')
export class ConfigController {
  constructor(private readonly config: ConfigService) {}

  @Get('health')
  ok() {
    return {
      ok: true,
      port: this.config.get<number>('PORT'),
      dbURL: this.config.get<string>('DATABASE_URL'),
    };
  }
}
