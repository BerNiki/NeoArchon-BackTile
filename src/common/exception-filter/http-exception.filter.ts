import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { genericHTTPExceptionMessages } from 'src/common/exception-filter/consts/genericHTTPExceptionMessages';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const builtInMessage = exception.message;
    const customMessage = genericHTTPExceptionMessages.find(
      (message) => message.status === status,
    );

    response.status(status).json({
      statusCode: status,
      message: customMessage || builtInMessage,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
