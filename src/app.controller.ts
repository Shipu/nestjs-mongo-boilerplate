import { Controller, Get, Req, UseInterceptors } from '@nestjs/common';
import { ResponseTransformInterceptor } from './core/http/interceptors/response.transform.interceptor';
import { Request } from 'express';

@Controller()
export class AppController {
  @Get()
  @UseInterceptors(ResponseTransformInterceptor)
  getHello(@Req() request: Request): any {
    return {
      message: 'NestJs Mongo Boilerplate',
      method: request.method,
    };
  }
}
