import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';
import { HttpExceptionFilter } from './utils/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
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
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors({
    origin: ['http://localhost:3333', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  await app.listen(process.env.PORT!, '0.0.0.0');
}
void bootstrap();
