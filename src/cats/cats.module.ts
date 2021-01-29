import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat, CatSchema } from './schemas/cat.schema';
import { JoiPipeModule } from 'nestjs-joi';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Cat.name,
        useFactory: () => {
          return CatSchema;
        },
      },
    ]),
    JoiPipeModule,
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}