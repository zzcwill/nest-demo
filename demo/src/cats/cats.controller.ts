import { Controller, Get, Req, Redirect, Post, Body, HttpCode, Header } from '@nestjs/common';
import { Request } from 'express';

import { CreateCatDto } from './dto/create-cat.dto'

import { ValidationPipe } from './validate.pipe'

@Controller('cats')
export class CatsController {

	@Get()
  find(): string {
    return 'this is cats';
  }

	@Get('index')
	@Redirect('/cats')

	@Get('user')
  find2(@Req() request: Request): object {
    return {
			username: request.query.user
		};
  }

	@Get('yb')
	async find3(): Promise<any[]> {
		return [{
			name: 'zzc'
		}];
	}

	@Post('/user')
	async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
		return createCatDto;
	}
}
