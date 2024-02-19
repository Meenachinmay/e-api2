import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/types/user.type';
import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  serializeUser(user: any, done: Function) {
    done(null, user);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async deserializeUser(user: User, done: Function) {
    if (!user || !user.email) {
      return done(null, false);
    }
    const userDb = await this.prismaService.user.findUnique({
      where: {
        email: user.email,
      },
    });
    return userDb ? done(null, userDb) : done(null, null);
  }
}
