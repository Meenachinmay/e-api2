import { Body, Controller, Get, Post, Response } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/user.dto';
import { ErrorResponse } from './types/error.type';
import { User } from './types/user.type';
// import { KafkaService } from './kafka/kafka.service';

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

  @Get('/health-check')
  healthCheck(@Response() res) {
    res.sendStatus(200);
  }
}

// commented code here

// @Get('/kafka')
// checkKafka() {
//   this.kafkaService.sendMessage('oeapi', { name: 'Chinmay' });
// }
