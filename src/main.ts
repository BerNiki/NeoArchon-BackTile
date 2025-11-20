import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { Logger } from 'nestjs-pino';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

import { TransformInterceptor } from './common/interceptors/transformInterceptor/transform.interceptor';
import { HttpExceptionFilter } from './common/exception-filter/http-exception.filter';

import {
  corsOptions,
  globalValidationPipeOptions,
} from './shared/consts/app-config-consts/app-config-options/appConfigOptions';
import { httpsOptions } from './shared/consts/app-config-consts/https-options-loader/https-options-loader';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './shared/consts/app-config-consts/swagger-config/swagger-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
    bufferLogs: true,
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe(globalValidationPipeOptions));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useLogger(app.get(Logger));
  app.enableCors(corsOptions);
  app.use(cookieParser());
  app.setGlobalPrefix('api');

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT!, '0.0.0.0');
}
void bootstrap();

//testing pipeline
