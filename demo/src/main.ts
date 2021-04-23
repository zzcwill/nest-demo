import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { GlobalExceptionFilter } from './filters/global-exceptoin.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(3000);
}
bootstrap();
