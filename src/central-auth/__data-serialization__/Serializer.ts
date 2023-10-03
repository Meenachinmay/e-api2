import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/types/user.type';
import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  serializeUser(user: any, done: Function) {
    done(null, user);
  }

  async deserializeUser(user: User, done: Function) {
    const userDb = await this.prismaService.user.findUnique({
      where: {
        email: user.email,
      },
    });
    return userDb ? done(null, userDb) : done(null, null);
  }
}
