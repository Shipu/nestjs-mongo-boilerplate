import { Body, Controller, Get, Post, SetMetadata, UseGuards, UseInterceptors } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './schemas/cat.schema';
import { ResponseInterceptor } from '../core/interceptors/response.interceptor';
import { CatDto } from './dto/cat.dto';
import { AuthGuard } from '@nestjs/passport';
import { Groups } from '../common/decorators/groups.decorator';
import { GroupsGuard } from '../common/guards/groups.guard';

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
  @Groups('BalanceManager')
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
