import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User } from './types/user.type';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  // get the record
  async getAll() {
    return await this.prisma.user.findMany();
  }

  // create the record
  async createUser(user: User) {
    return this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }

  // update the record
  async updateUser(user: User) {
    return this.prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        name: user.name,
      },
    });
  }
}
