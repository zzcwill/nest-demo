import { Controller, Get, Req, Redirect, Post, Body, HttpCode, Header, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';

import { CreateCatDto } from './dto/create-cat.dto'

import { ParseIntPipe } from './pipe/parse-int.pipe'

import { ValidationPipe } from './validate.pipe'

import { Cat } from './interfaces/cat.interface';

import { CatsService } from './cats.service';

import { AuthGuard } from './guard/auth.guard'

import { LoggingInterceptor } from './interceptor/logging.interceptor'


@Controller('cats')
export class CatsController {
	constructor(private readonly catsService: CatsService) {}

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

	@Post('/user2')
	async create2(@Body('name', new ParseIntPipe()) name) {
		return name;
	}

	@Get('list')
  async list(): Promise<Cat[]> {
    return this.catsService.getList();
  }

	@Post('/token')
	@UseGuards(AuthGuard)
	async token(@Body('token') token) {
		return token;
	}

	@Post('inter')
	@UseInterceptors(LoggingInterceptor)
	async inter(@Body() body) {
		console.info(2)
		return body;
	}
}
