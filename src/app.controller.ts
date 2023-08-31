import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

export type UserType = {
  name: string
  email: string
  password: string
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/users')
  getAll() {
    return this.appService.getAll();
  }

  @Post('/users')
  createUser(@Body() user: UserType) {
    return this.appService.createUser(user);
  }
}
