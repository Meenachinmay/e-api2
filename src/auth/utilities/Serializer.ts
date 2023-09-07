import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { User } from 'src/types/user.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  serializeUser(user: User, done: Function) {
    done(null, user);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/ban-types
  async deserializeUser(payload: User, done: Function) {
    console.log('payload', payload);
    const user = await this.authService.findUserForDeserialization(
      payload.email,
    );

    return user ? done(null, user) : done(null, null);
  }
}
