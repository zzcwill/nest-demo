import { Controller, Get, Req, Redirect, Post, Body, HttpCode, Header } from '@nestjs/common';
import { Request } from 'express';

import { CreateCatDto } from './dto/create-cat.dto'

import { ValidationPipe } from './validate.pipe'

import { Cat } from './interfaces/cat.interface';

import { CatsService } from './cats.service';

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

	@Get('list')
  async list(): Promise<Cat[]> {
    return this.catsService.getList();
  }
}
