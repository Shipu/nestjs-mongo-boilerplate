import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();

    const data = {
      success: false,
      message: exceptionResponse['message'],
      data: null,
    };

    const requestDetails = {
      method: request.method,
      headers: request.headers,
      query_params: request.query,
      body: request.body,
      requested_endpoint: request.originalUrl,
      response_body: data,
      status: response.statusCode,
    };

    const logString =
      JSON.stringify(requestDetails) +
      '\n' +
      [request.method, request.originalUrl, response.statusCode].join(' ');

    Logger.log(logString, 'HttpExceptionFilter');

    response.status(status).json(data);
  }
}
