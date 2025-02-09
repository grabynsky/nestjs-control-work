import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let messages: string | string[];

    if (exception instanceof BadRequestException) {
      status = exception.getStatus();
      messages = (exception as any).response.message;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      messages = exception.message;
    } else {
      status = 500;
      messages = 'Internal server error';
    }

    response.status(status).json({
      statusCode: status,
      messages: Array.isArray(messages) ? messages : [messages],
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
