import { Body, Controller, Get, Post, SetMetadata, UseGuards, UseInterceptors } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './schemas/cat.schema';
import { ResponseTransformInterceptor } from '../core/http/interceptors/response.transform.interceptor';
import { CatDto } from './dto/cat.dto';
import { AuthGuard } from '@nestjs/passport';
import { Groups } from '../core/decorators/groups.decorator';
import { GroupsGuard } from '../core/guards/groups.guard';

@Controller('cats')
@UseInterceptors(ResponseTransformInterceptor)
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
