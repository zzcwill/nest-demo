import { Controller, Get, ForbiddenException } from '@nestjs/common';

@Controller('api')
export class ApiController {
	@Get()
  find(): string {
    return 'api';
	}

	@Get('error')
  error() {
    throw new ForbiddenException();
  }
}

