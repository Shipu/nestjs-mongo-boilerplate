import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from '@nestjs/common';
import { tap } from 'rxjs/operators';

import { Request, Response } from 'express';

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() === 'http') {
      const ctx = context.switchToHttp();
      const request = ctx.getRequest<Request>();
      const response = ctx.getResponse<Response>();

      const request_id = uuidv4().split('-').join('');

      request.headers['X-Request-Id'] = request_id;
      response.set('X-Request-Id', request_id);

      return next.handle().pipe(
        tap((data) => {
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
            [request.method, request.originalUrl, response.statusCode].join(
              ' ',
            );

          Logger.log(logString, 'RequestLoggingInterceptor');
        }),
      );
    }
  }
}
