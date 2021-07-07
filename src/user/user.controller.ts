import { Controller, Get, Req, Res, Redirect, Post, Body, HttpCode, Header, UseGuards, UsePipes, UseInterceptors, Render, Inject, SetMetadata } from '@nestjs/common';
import { Request } from 'express';

import { UserService } from './user.service';

import { ClientProxy } from '@nestjs/microservices';
import { Message } from './message.event';
import { RABBITMQ_QUEUE_NAME, RABBITMQ_URL, RABBIT_TEST_PATTERN } from './constants';


import { AuthGuard } from '../guard/auth.guard'
import { ValidationPipe } from '../pipe/validation.pipe';

// import { LoginDTO, RegisterInfoDTO } from './user.dto';
import { LoginDTO } from './user.dto';
import { ApiTags, ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';

import { Roles } from '../decorator/roles.decorator'

@ApiBearerAuth()
@ApiTags('user')
@UseGuards(AuthGuard)
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

  // @SetMetadata('roles', ['admin'])
  @Roles('admin')
  @Post('/login')
  @ApiBody({
    description: '用户登录',
    type: LoginDTO,
  })
  @ApiResponse({
    status: 201,
    description:
      `"code": 200,
      "data": {
        "uid": 用户id \n,
        "username": 用户名\n,
        "password": "$2a$10$mHM8qhUmY9CkppRP537cwO01TOVEbALdtURKZQtYJcGPcWB8LCl/6",
        "salt": "$2a$10$mHM8qhUmY9CkppRP537cwO",
        "level": null,
        "is_on_duty": 1,
        "last_login_time": null,
        "register_time": "2021-04-30T07:35:53.000Z",
        "openid": null
      }`
  })
  @UsePipes(new ValidationPipe())
  async login(@Req() request,  @Body() loginParmas: LoginDTO) {
    console.info(request.user)
    const data = await this.userService.login(loginParmas.username, loginParmas.password);
    return {
      code: 200,
      data: data
    }
  }

  @Get('/test')
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
