import { Controller, Get } from '@nestjs/common';

import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@Controller()
export class AppController {

  @ApiTags('api')
  @Get()
  getNest(): string {
    return 'hi nest'
  }
}
