import { Controller, Get, Req, Redirect, Post, Body, HttpCode, Header, UseGuards, UseInterceptors } from '@nestjs/common';
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
}
