import { Body, Controller, Get, Post, SetMetadata, UseGuards, UseInterceptors } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './schemas/cat.schema';
import { ResponseInterceptor } from '../interceptors/response.interceptor';
import { CatDto } from './dto/cat.dto';
import { AuthGuard } from '@nestjs/passport';
import { Groups } from '../auth/groups.decorator';
import { GroupsGuard } from '../auth/groups.guard';

@Controller('cats')
@UseInterceptors(ResponseInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @UseGuards(AuthGuard(['jwt']))
  async create(@Body() createCat: CatDto) {
    return await this.catsService.create(createCat);
  }

  @Get()
  @UseGuards(AuthGuard(['jwt', 'evaly-secret']), GroupsGuard)
  @Groups('BalanceManager', 'admin')
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
