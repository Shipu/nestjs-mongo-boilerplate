import { Controller, Get, Req, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { CatsService } from './cats.service';
import { Cat } from './cat.entity';
import { TransformInterceptor } from '../interceptors/transform.interceptor';

@Controller('cats')
@UseInterceptors(TransformInterceptor)
export class CatsController {
  constructor(private readonly catService: CatsService) {}
  @Get()
  findAll(@Req() request: Request): Promise<Cat[]> {
    return this.catService.findAll();
  }
}
