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
        let status = null;
        if (data?.message) {
          message = data.message;
          delete data.message;
        }

        if (data?.statusCode) {
          status = data.statusCode;
          delete data.statusCode;
        }

        status = status || response.statusCode;
        response.status(status);
        return {
          status: status,
          message: message || response.statusMessage || 'OK',
          data: data || {},
        };
      }),
    );
  }
}
