import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserType } from './app.controller';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getAll() {
    return await this.prisma.user.findMany();
  }

  async createUser(user: UserType) {
    return this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }
}
