import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { CentralAuthService } from '../central-auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly centralAuthService: CentralAuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const result = await this.centralAuthService.validateUser(email, password);
    if (!result) {
      throw new HttpException(
        'Login Credentials are invalid',
        HttpStatus.UNAUTHORIZED,
      );
    } else {
      return result;
    }
  }
}
