import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CentralAuthService } from './central-auth.service';
import { LoginUserDto } from 'src/dtos/login.dto';
import { LocalAuthGuard } from './__guards__/Guards';

@Controller('central-auth')
export class CentralAuthController {
  constructor(private readonly centralAuthService: CentralAuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Body() loginUser: LoginUserDto) {}

  @Post('logout')
  logout() {}
}
