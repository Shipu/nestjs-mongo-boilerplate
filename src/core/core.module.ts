import { HttpModule, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { RequestLoggingInterceptor } from './http/interceptors/request.logging.interceptor';
import { JwtStrategy } from './http/strategies/jwt.strategy';
import { EvalySecretStrategy } from './http/strategies/evaly-secret.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ErrorsLoggerInterceptor } from './http/interceptors/errors.logger.interceptor';
import { ResponseTransformInterceptor } from './http/interceptors/response.transform.interceptor';
import { AuthServiceStrategy } from './http/strategies/auth-service.strategy';
import { HttpExceptionFilter } from './http/filters/exeptions.formatter.filter';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    HttpModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsLoggerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    JwtStrategy,
    AuthServiceStrategy,
    EvalySecretStrategy,
  ],
})
export class CoreModule {}
