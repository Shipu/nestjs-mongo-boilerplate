import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { CatsService } from './cats.service';
import { Cat } from './cat.entity';

@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatsService) {}
  @Get()
  findAll(@Req() request: Request): Promise<Cat[]> {
    return this.catService.findAll();
  }
}
