import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './core/http/middlewares/logger.middleware';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });
  app.use(logger);
  await app.listen(process.env.APP_PORT);
  Logger.log(
    `Application is running on: ${(await app.getUrl()).replace(
      '[::1]',
      'localhost',
    ), process.env.APP_NAME || 'NestJs Mongo boilerplate'}`,
  );
}
bootstrap();
