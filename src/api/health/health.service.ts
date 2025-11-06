import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DbStatusEnum,
  DbStatusResponseI,
} from 'src/api/health/interfaces/heath.interfaces';
import { DataSource } from 'typeorm';

@Injectable()
export class HealthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource,
  ) {}
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
