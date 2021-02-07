import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EvalySecretStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'evaly-secret',
) {
  constructor(private readonly configService: ConfigService) {
    super(
      {
        header: 'SECRET-KEY',
        prefix: '',
      },
      true,
      async (apiKey, verified, req) => {
        return verified(
          null,
          this.validate(apiKey, configService.get<string>('EVALY_SECRET_KEY')),
        );
      },
    );
  }

  validate(apiKey: string, secretKey: string): boolean {
    return apiKey == secretKey;
  }
}
