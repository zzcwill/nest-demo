import { Controller, Get, Req, Res, Redirect, Post, Body, HttpCode, Header, UseGuards, UseInterceptors, Render, Inject } from '@nestjs/common';
import { Request } from 'express';

import { UserService } from './user.service';

import { ClientProxy } from '@nestjs/microservices';
import { Message } from './message.event';
import { RABBITMQ_QUEUE_NAME, RABBITMQ_URL, RABBIT_TEST_PATTERN } from './constants';


import { AuthGuard } from '../guard/auth.guard'

// import { LoginDTO, RegisterInfoDTO } from './user.dto';
import { LoginDTO } from './user.dto';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user')
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

  @Get('/to')
  @Redirect('/user/test')
  async toUrl() {
  }  

	@Post('/login')
  @ApiBody({
    description: '用户登录',
    type: LoginDTO,
  })  
  async login(@Body() loginParmas: LoginDTO) {
    const data = await this.userService.login(loginParmas.username, loginParmas.password);
    return {
      code: 200,
      data: data
    }
  } 

	@Get('/test')
  // @UseGuards(AuthGuard)
  // @UseInterceptors(LoggingInterceptor)
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
