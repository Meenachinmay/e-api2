import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User } from './types/user.type';
import { CreateUserDto } from './dtos/user.dto';
import { ErrorResponse } from './types/error.type';

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
  async createUser(user: CreateUserDto): Promise<User | ErrorResponse> {
    // find given email in the database if the email exists then do not save in database
    const foundEmail = await this.prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (foundEmail) {
      // do not save the user in database
      return {
        message: 'User already exists in database',
        errorCode: '400',
      };
    }

    // if everything is fine then save the user in the database
    return await this.prisma.user.create({
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
