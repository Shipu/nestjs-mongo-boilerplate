import { PassportStrategy } from '@nestjs/passport';
import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

@Injectable()
export class AuthServiceStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'auth',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    super(
      {
        header: 'Authorization',
        prefix: '',
      },
      true,
      async (apiKey, verified, req) => {
        return verified(null, await this.validate(apiKey));
      },
    );
  }

  async validate(auth_scheme: any): Promise<any> {
    const response: any = await this.callAuthServiceForVerifyToken(
      this.fromAuthHeaderAsBearerToken(auth_scheme),
    );
    return response?.data?.data;
  }

  fromAuthHeaderAsBearerToken(auth_scheme) {
    return auth_scheme.replace('Bearer ', '');
  }

  async callAuthServiceForVerifyToken(token) {
    try {
      const response = await this.httpService
        .get(process.env.AUTH_SERVICE_URL + '/api/v1/auth/validate-token', {
          headers: {
            Authorization: token,
          },
        })
        .toPromise();
      return response;
    } catch (e) {
      console.log(e.message);
      return false;
    }
  }
}
