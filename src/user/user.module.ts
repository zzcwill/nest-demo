import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../entity/user.entity';

import { Transport, ClientsModule } from '@nestjs/microservices';
import { RABBITMQ_QUEUE_NAME, RABBITMQ_URL, RABBIT_TEST_PATTERN } from './constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HI_SERVICE', 
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ_URL],
          queue: RABBITMQ_QUEUE_NAME,
          queueOptions: {
            durable: false
          }
        }
      },
    ]),    
    TypeOrmModule.forFeature([User])
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}