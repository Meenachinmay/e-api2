import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './utilities/Guards';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {}

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect() {
    return { msg: 'ok' };
  }

  @Get('user')
  getUser(@Req() request: Request) {
    console.log(request.user);
    if (request.user) {
      return { msg: 'authenticated' };
    } else {
      return { msg: 'not authenticated' };
    }
  }

  @Get('check-user')
  checkUser(@Req() request: Request) {
    if (request.user) {
      return { msg: 'check user authenticated' };
    } else {
      return { msg: 'check user not authenticated' };
    }
  }
}
