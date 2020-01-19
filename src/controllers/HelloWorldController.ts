import { Controller, Get } from '@nestjs/common';

@Controller()
export class HelloWorldController {
  @Get()
  async getHelloWorld() {
    return { message: 'hello world!' };
  }
}
