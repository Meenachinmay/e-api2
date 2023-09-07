import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, UserRole } from 'src/types/user.type';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async validateUser(details: User) {
    // first check if the user is already exists
    const userFound = await this.prisma.user.findUnique({
      where: {
        email: details.email,
      },
    });

    // if user found
    if (userFound) {
      return userFound;
    }

    // save the values in database and return a user
    return await this.prisma.user.create({
      data: {
        email: details.email,
        name: details.name,
        password: '',
      },
    });
  }

  // method to deserialize the user
  async findUserForDeserialization(email: string) {
    // find the user with email
    const userFound = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return userFound;
  }
}
