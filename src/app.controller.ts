import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './types/user.type';

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
  createUser(@Body() user: User) {
    return this.appService.createUser(user);
  }

  @Post('/update-users')
  updateUser(@Body() user: User) {
    return this.appService.updateUser(user);
  }
}
