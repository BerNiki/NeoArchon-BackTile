/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '../config.service';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';

jest.mock('fs', () => ({
  __esModule: true,
  readFileSync: jest.fn(),
}));

const mockKeyPair: CryptoKeyPair = {
  privateKey: {} as unknown as CryptoKey,
  publicKey: {} as unknown as CryptoKey,
};

describe('ConfigService', () => {
  let service: ConfigService;
  let mockNestConfig: NestConfigService;

  interface mockConfigValuesInterface {
    JWT_KEY_PUBLIC_PATH: string;
    JWT_KID: string;
    JWT_ISS: string;
    JWT_AUD: string;
    JWT_EXPIRATION: string;
    JWT_REFRESH_EXPIRATION: string;
  }

  const mockConfigValues: mockConfigValuesInterface = {
    JWT_KEY_PUBLIC_PATH: '/mock/path/public.key',
    JWT_KID: 'mock-kid-123',
    JWT_ISS: 'mock-issuer.com',
    JWT_AUD: 'mock-audience.com',
    JWT_EXPIRATION: '15m',
    JWT_REFRESH_EXPIRATION: '7d',
  };
  const mockedReadFile = readFileSync as jest.Mock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        {
          provide: NestConfigService,
          useValue: {
            get: jest.fn(
              (key: string): string | null =>
                mockConfigValues[key as keyof mockConfigValuesInterface] ??
                null,
            ),
          },
        },
        {
          provide: 'JWT_KEY_PAIR',
          useValue: mockKeyPair,
        },
      ],
    }).compile();

    mockNestConfig = module.get<NestConfigService>(NestConfigService);
    service = module.get<ConfigService>(ConfigService);

    mockedReadFile.mockClear();
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return private key from env variable', () => {
    expect(service.getPrivateKey()).toBe(mockKeyPair.privateKey);
  });

  it('should return public key after reading key file and got called get with corresponding string', () => {
    const mockKeyContent = '---BEGIN MOCK PUBLIC KEY---';

    mockedReadFile.mockReturnValue(mockKeyContent);

    expect(service.getPublicKeyAsString()).toBe(mockKeyContent);
    expect(mockNestConfig.get).toHaveBeenCalledWith('JWT_KEY_PUBLIC_PATH');
  });

  it('should throw error if env variable does not contain public key path.', () => {
    jest.spyOn(mockNestConfig, 'get').mockReturnValue(null);

    expect(() => service.getPublicKeyAsString()).toThrow(
      'JWT_KEY_PUBLIC_PATH is not set in environment variables',
    );
  });

  it('should return kid from env variable and got called get with corresponding string', () => {
    expect(service.kid).toBe(mockConfigValues.JWT_KID);
    expect(mockNestConfig.get).toHaveBeenCalledWith('JWT_KID');
  });

  it('should return issuer from env variable and got called get with corresponding string', () => {
    expect(service.issuer).toBe(mockConfigValues.JWT_ISS);
    expect(mockNestConfig.get).toHaveBeenCalledWith('JWT_ISS');
  });

  it('should return audience from env variable and got called get with corresponding string', () => {
    expect(service.audience).toBe(mockConfigValues.JWT_AUD);
    expect(mockNestConfig.get).toHaveBeenCalledWith('JWT_AUD');
  });

  it('should return jwt expiration from env variable and got called get with corresponding string', () => {
    expect(service.jwtExpiration).toBe(mockConfigValues.JWT_EXPIRATION);
    expect(mockNestConfig.get).toHaveBeenCalledWith('JWT_EXPIRATION');
  });

  it('should return jwt refresh expiration from env variable and got called get with corresponding string', () => {
    expect(service.jwtRefreshExpiration).toBe(
      mockConfigValues.JWT_REFRESH_EXPIRATION,
    );
    expect(mockNestConfig.get).toHaveBeenCalledWith('JWT_REFRESH_EXPIRATION');
  });

  it('should return token options object', () => {
    expect(service.tokenOptions).toMatchObject({
      audience: mockConfigValues.JWT_AUD,
      issuer: mockConfigValues.JWT_ISS,
      jwtExpiration: mockConfigValues.JWT_EXPIRATION,
      kid: mockConfigValues.JWT_KID,
      privateKey: mockKeyPair.privateKey,
    });
  });
});
