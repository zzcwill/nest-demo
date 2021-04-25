import { Controller, Get, Req, Res, Redirect, Post, Body, HttpCode, Header, UseGuards, UseInterceptors, Render } from '@nestjs/common';
import { Request } from 'express';

import { UserService } from './user.service';

@Controller('/user')
export class UserController {
	constructor(private readonly userService: UserService) {}

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
}
