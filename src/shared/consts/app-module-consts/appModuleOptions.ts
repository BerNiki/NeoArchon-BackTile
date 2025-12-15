import {
  ConfigModule as ConfigModuleClass,
  ConfigService,
} from '@nestjs/config';
import { Request, Response } from 'express';

import Joi from 'joi';
import { GamePlayer } from 'src/api/games/entities/gamePlayers.entity';
import { Game } from 'src/api/games/entities/games.entity';
import { Move } from 'src/api/moves/entities/moves.entity';
import { User } from 'src/api/users/entities/users.entity';

export const CONFIG_MODULE_OPTIONS = {
  isGlobal: true,
  envFilePath: '.env',
  validationSchema: Joi.object({
    PORT: Joi.number().default(3000),
    DATABASE_URL: Joi.string().required(),
    JWT_KEY_PRIVATE_PATH: Joi.string().required(),
    JWT_KEY_PUBLIC_PATH: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.string().default('15m'),
    JWT_REFRESH_EXPIRES_IN: Joi.string().default('2d'),
    JWT_KID: Joi.string().min(10).required(),
    JWT_ISS: Joi.string().uri().required(),
    JWT_AUD: Joi.string().required(),
    COOKIE_SECURE: Joi.boolean().required(),
    COOKIE_SAMESITE: Joi.string().valid('strict', 'lax', 'none').required(),
    COOKIE_PATH: Joi.string().default('/'),
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test')
      .default('development'),
    COOKIE_DOMAIN: Joi.string().optional(),
  }),
  validationOptions: { abortEarly: false },
};

export const TYPEORM_MODULE_OPTIONS = {
  imports: [ConfigModuleClass],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres' as const,
    url: configService.get<string>('DATABASE_URL'),
    entities: [User, Game, GamePlayer, Move],
    logging: true,
    synchronize: true,
  }),
};

export const LOGGER_MODULE_OPTIONS = {
  pinoHttp: {
    redact: {
      paths: [
        'req.headers.authorization',
        'req.headers.cookie',
        'req.headers["set-cookie"]',
      ],
      remove: true,
    },
  },
  transport:
    process.env.NODE_ENV !== 'production'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            singleLine: true,
          },
        }
      : undefined,
  serializers: {
    req: (req: Request) => ({
      method: req.method,
      url: req.url,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      correlationId: (req as any).correlationId,
    }),
    res: (res: Response) => ({
      statusCode: res.statusCode,
    }),
  },
};

export const THROTTLER_MODULE_OPTIONS = {
  throttlers: [
    {
      ttl: 6000,
      limit: 20,
      blockDuration: 1500,
    },
  ],
};
