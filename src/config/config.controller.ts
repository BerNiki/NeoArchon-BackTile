import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import {
  DbStatusEnum,
  type DbStatusResponseI,
  type LivenessResponseI,
} from 'src/interfaces/config.interfaces';
import { ConfigService } from './config.service';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get('health')
  liveliness(): LivenessResponseI {
    return this.configService.getLiveness();
  }

  @Get('ready')
  async readiness(): Promise<DbStatusResponseI> {
    const status = await this.configService.getReadiness();
    if (status.db === DbStatusEnum.DOWN)
      throw new HttpException(status, HttpStatus.SERVICE_UNAVAILABLE);

    return status;
  }
}
