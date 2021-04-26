import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { AppService } from './app.service'

import { RABBITMQ_QUEUE_NAME, RABBITMQ_URL, RABBIT_TEST_PATTERN } from './constants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }


  @EventPattern(RABBIT_TEST_PATTERN)
  async handleMessagePrinted(data) {
    console.log('consume:' + data.text);
  }
}
