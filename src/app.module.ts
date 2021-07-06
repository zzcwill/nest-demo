import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { UserModule } from './user/user.module';

import { LoggerMiddleware } from './middleware/logger.middleware';

import { AppController } from './app.controller';

import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { RedisModule } from './redis/redis.module';



@Module({
  imports: [    
    ConfigModule,  
    TypeOrmModule.forRootAsync({
        useFactory: async (configService: ConfigService) => {
            // typeorm bug, https://github.com/nestjs/nest/issues/1119
            // 将 type 定义为 type: 'mysql' | 'mariadb'; 解决此issue
            return configService.db;
        },
        inject: [ ConfigService ],
    }),
    RedisModule.forRootAsync({
        useFactory: async (configService: ConfigService): Promise<ConfigService> => {
            return configService;
        },
        inject: [ ConfigService ],
    }),
    UserModule
  ],
  controllers: [AppController]
})
export class AppModule implements NestModule {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    const middlewares = [
      LoggerMiddleware
  ];
  consumer
      .apply(...middlewares)
      .exclude(
        // { path: 'doc', method: RequestMethod.GET },
        // { path: 'doc', method: RequestMethod.POST },
        'doc/(.*)',
        'user/test',
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
