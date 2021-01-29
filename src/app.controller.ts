import { Controller, Get, Req, UseInterceptors } from '@nestjs/common';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { Request } from 'express';

@Controller()
export class AppController {
  @Get()
  @UseInterceptors(ResponseInterceptor)
  getHello(@Req() request: Request): any {
    return {
      message: 'NestJs Mongo Boilerplate',
      method: request.method,
    };
  }
}
