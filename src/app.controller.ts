import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  getNest(): string {
    return 'hi nest'
  }
}
