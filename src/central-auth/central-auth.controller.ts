import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CentralAuthService } from './central-auth.service';
import { LoginUserDto } from 'src/dtos/login.dto';
import { AuthenticatedGuard, LocalAuthGuard } from './__guards__/Guards';

@Controller('central-auth')
export class CentralAuthController {
  constructor(private readonly centralAuthService: CentralAuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Body() loginUser: LoginUserDto) {}

  @Post('logout')
  logout(@Req() req, @Res() res): Promise<string> {
    return req.logout(() => {
      req.session.destroy((err) => {
        if (err) {
          // handle error
          return res.status(500).send({ msg: 'Error logging out' });
        }
        res.clearCookie('connect.sid', { path: '/' }); // If you're using the default session cookie name
        return res.status(200).send({ msg: 'Logged out successfully' });
      });
    });
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/get-auth-status')
  checkAuth() {
    return { msg: 'OK' };
  }
}
