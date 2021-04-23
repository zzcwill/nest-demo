import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { CatsModule } from './cats/cats.module';

import { LoggerMiddleware } from './middleware/logger.middleware';
import { ApiController } from './api/api.controller';

import { AppController } from './app.controller';


@Module({
  imports: [CatsModule],
  controllers: [AppController,ApiController]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const middlewares = [
      LoggerMiddleware
  ];
  consumer
      .apply(...middlewares)
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        'cats/(.*)',
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
