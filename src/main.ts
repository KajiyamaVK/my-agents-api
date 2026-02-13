import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';


async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0').then(() => {
    logger.log({ msg: `Application is running`, url: `http://localhost:${port}` });
  });
}
bootstrap();
