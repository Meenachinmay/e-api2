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

  @Get('logout')
  handleLogout(@Req() request: Request) {
    request.logOut(() => {});
    return { msg: 'logged out' };
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

  @Get('health-check')
  healthCheck(): any {
    return {
      status: 'OK',
      message: 'Service is healthy',
    };
  }
}
