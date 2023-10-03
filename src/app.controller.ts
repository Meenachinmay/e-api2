import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './types/user.type';
import { CreateUserDto } from './dtos/user.dto';
import { ErrorResponse } from './types/error.type';
// import { KafkaService } from './kafka/kafka.service';
import { Response, Request } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, // private readonly kafkaService: KafkaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/users')
  getAll() {
    return this.appService.getAll();
  }

  @Post('/users')
  createUser(@Body() user: CreateUserDto): Promise<User | ErrorResponse> {
    return this.appService.createUser(user);
  }

  @Post('/update-users')
  updateUser(@Body() user: User) {
    return this.appService.updateUser(user);
  }

  // @Get('/kafka')
  // checkKafka() {
  //   this.kafkaService.sendMessage('oeapi', { name: 'Chinmay' });
  // }

  @Get('/health-check')
  healthCheck(@Res() res: Response) {
    res.sendStatus(200);
  }
}
