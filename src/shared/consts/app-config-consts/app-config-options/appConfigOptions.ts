import { BadRequestException, ValidationError } from '@nestjs/common';

export const globalValidationPipeOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  exceptionFactory: (errors: ValidationError[]) => {
    const flat = errors.flatMap((e) =>
      e.constraints
        ? Object.values(e.constraints).map((msg) => ({
            path: e.property,
            message: msg,
          }))
        : [],
    );
    return new BadRequestException({
      status: 400,
      code: 'VAL_001',
      message: 'Invalid request body',
      errors: flat,
    });
  },
};

export const corsOptions = {
  origin: ['https://localhost:3333'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
