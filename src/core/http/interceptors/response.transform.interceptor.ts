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
export class ResponseTransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    if (context.getType() === 'http') {
      const response = context.switchToHttp().getResponse();
      return next.handle().pipe(
        map((data) => {
          let message = null;
          let statusCode = null;
          let success = true;
          let meta = null;

          if (data?.message) {
            message = data.message;
            delete data.message;
          }

          if (data?.statusCode) {
            statusCode = data.statusCode;
            delete data.statusCode;
          }

          if (data?.success) {
            success = data.success;
            delete data.success;
          }

          if (data?.meta) {
            meta = data.meta;
            delete data.meta;
          }

          statusCode = statusCode || response.statusCode;
          response.status(statusCode);
          return {
            success: success,
            message: message || response.statusMessage || 'OK',
            meta: meta,
            data: data || {},
          };
        }),
      );
    } else {
      return next.handle().pipe(map((data) => data));
    }
  }
}
