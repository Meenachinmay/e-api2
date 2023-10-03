import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './types/user.type';
import { CreateUserDto } from './dtos/user.dto';
import { ErrorResponse } from './types/error.type';
// import { KafkaService } from './kafka/kafka.service';
import { Response } from 'express';
import { LocalAuthGuard } from './central-auth/__guards__/local-auth.guard';

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
  healthCheck(@Res() res: Response) {
    res.sendStatus(200);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() request): any {
    return request.user;
  }
}

// commented code here

// @Get('/kafka')
// checkKafka() {
//   this.kafkaService.sendMessage('oeapi', { name: 'Chinmay' });
// }
