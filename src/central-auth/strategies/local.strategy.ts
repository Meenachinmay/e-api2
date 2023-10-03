import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import {
  CentralAuthService,
  ValidateUserReturnResponse,
} from '../central-auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly centralAuthService: CentralAuthService) {
    super();
  }

  async validate(
    username: string,
    password: string,
  ): Promise<ValidateUserReturnResponse> {
    const user = await this.centralAuthService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
