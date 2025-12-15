/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'nestjs-pino';
import { genericHTTPExceptionMessages } from 'src/common/exception-filter/consts/genericHTTPExceptionMessages';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const builtInMessage = exception.message;

    const exceptionResponse =
      typeof exception.getResponse() === 'string'
        ? exception.getResponse()
        : (exception.getResponse() as any).errors;
    const customMessage = genericHTTPExceptionMessages.find(
      (message) => message.status === status,
    );

    console.log(exceptionResponse);

    this.logger.error({
      status,
      path: request.url,
      message: exceptionResponse || customMessage || builtInMessage,
    });

    response.status(status).json({
      statusCode: status,
      message: exceptionResponse || customMessage || builtInMessage,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
