import { Controller, Get, Req, Res, Redirect, Post, Body, HttpCode, Header, UseGuards, UseInterceptors, Render, Inject } from '@nestjs/common';
import { Request } from 'express';

import { UserService } from './user.service';

import { ClientProxy } from '@nestjs/microservices';
import { Message } from './message.event';
import { RABBITMQ_QUEUE_NAME, RABBITMQ_URL, RABBIT_TEST_PATTERN } from './constants';

@Controller('/user')
export class UserController {
	constructor(
    @Inject('HI_SERVICE') private readonly client: ClientProxy,
    private readonly userService: UserService
  ) {

  }

	@Get()
  async find() {
		let data = await this.userService.findAll();
    return data;
  }

	@Post('/login')
  async login(@Body('id') id) {
		let data = await this.userService.login(id);
    return data;
  }	

	@Get('/test')
  @Render('test')
  async page() {
    return { title: 'test' }
  }  

  @Get('mq')
  mq() {
    let data = new Message('zzc');
    this.client.emit(RABBIT_TEST_PATTERN, data);
    return data;
  }  
}
