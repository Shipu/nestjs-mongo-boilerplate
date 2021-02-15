import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        let message = null;
        let statusCode = null;
        if (data?.message) {
          message = data.message;
          delete data.message;
        }

        if (data?.statusCode) {
          statusCode = data.statusCode;
          delete data.statusCode;
        }

        statusCode = statusCode || response.statusCode;
        response.status(statusCode);
        return {
          statusCode: statusCode,
          message: message || response.statusMessage || 'OK',
          data: data || {},
        };
      }),
    );
  }
}
