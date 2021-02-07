import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { logger } from './common/middlewares/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.use(logger);
  await app.listen(configService.get('APP_PORT'));
  console.log(`Application is running on: ${(await app.getUrl()).replace('[::1]', 'localhost')}`);
}
bootstrap();
