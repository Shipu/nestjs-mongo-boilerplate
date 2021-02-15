import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { logger } from './common/middlewares/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, SERVICE, X-EVALY-PLATFORM',
  });
  app.use(logger);
  await app.listen(configService.get('APP_PORT'));
  console.log(
    `Application is running on: ${(await app.getUrl()).replace(
      '[::1]',
      'localhost',
    )}`,
  );
}
bootstrap();
