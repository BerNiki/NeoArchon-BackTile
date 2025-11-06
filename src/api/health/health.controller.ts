import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { HealthService } from './health.service';
import {
  type LivenessResponseI,
  type DbStatusResponseI,
  DbStatusEnum,
} from 'src/api/health/interfaces/heath.interfaces';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('')
  liveliness(): LivenessResponseI {
    return this.healthService.getLiveness();
  }

  @Get('ready')
  async readiness(): Promise<DbStatusResponseI> {
    const status = await this.healthService.getReadiness();
    if (status.db === DbStatusEnum.DOWN)
      throw new HttpException(status, HttpStatus.SERVICE_UNAVAILABLE);

    return status;
  }
}
