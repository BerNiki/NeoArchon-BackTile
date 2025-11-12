/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from '../health.service';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { DbStatusEnum } from '../interfaces/heath.interfaces';
import { HealthController } from '../health.controller';
import { HttpException, HttpStatus } from '@nestjs/common';

interface mockLivenessResponseInteface {
  ok: boolean;
  port: string;
  uptime: unknown;
  timestamp: unknown;
}

const mockLivenessResponse: mockLivenessResponseInteface = {
  ok: true,
  port: `Backend listening on: 3000`,
  uptime: expect.any(Number),
  timestamp: expect.any(String),
};

describe('HealthService', () => {
  let service: HealthService;
  let mockDataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        { provide: ConfigService, useValue: { get: jest.fn(() => 3000) } },
        {
          provide: DataSource,
          useValue: {
            query: jest.fn(() => Promise.resolve('server response')),
          },
        },
      ],
    }).compile();

    mockDataSource = module.get<DataSource>(DataSource);
    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return server liveness infos', () => {
    expect(service.getLiveness()).toMatchObject(mockLivenessResponse);
  });

  it('should return UP if server is ready to recieve requests', async () => {
    expect(await service.getReadiness()).toMatchObject({ db: DbStatusEnum.UP });
  });

  it('should return DOWN if server is not ready to recieve requests', async () => {
    jest
      .spyOn(mockDataSource, 'query')
      .mockRejectedValue(new Error('No response'));

    expect(await service.getReadiness()).toMatchObject({
      db: DbStatusEnum.DOWN,
    });
  });
});

const mockHealthService = {
  getLiveness: jest.fn(),
  getReadiness: jest.fn(),
};

const mockReadinessResponse = {
  db: DbStatusEnum.UP,
};

describe('HealthController', () => {
  let controller: HealthController;
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [{ provide: HealthService, useValue: mockHealthService }],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    service = module.get<HealthService>(HealthService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('return liveness info', () => {
    mockHealthService.getLiveness.mockReturnValue(mockLivenessResponse);

    expect(controller.liveliness()).toMatchObject(mockLivenessResponse);
    expect(service.getLiveness).toHaveBeenCalledTimes(1);
  });

  it('should return UP if server is ready', async () => {
    mockHealthService.getReadiness.mockReturnValue(
      Promise.resolve(mockReadinessResponse),
    );

    expect(await controller.readiness()).toMatchObject({ db: DbStatusEnum.UP });
    expect(service.getReadiness).toHaveBeenCalledTimes(1);
  });

  it('should throw Http exception error if server is not ready', async () => {
    jest
      .spyOn(mockHealthService, 'getReadiness')
      .mockReturnValue({ db: DbStatusEnum.DOWN });

    await expect(controller.readiness()).rejects.toThrow(
      new HttpException(
        { db: DbStatusEnum.DOWN },
        HttpStatus.SERVICE_UNAVAILABLE,
      ),
    );
    expect(service.getReadiness).toHaveBeenCalledTimes(1);
  });
});
