import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from 'src/types/user.type';

export type ValidateUserReturnResponse = Omit<User, 'password'>;

@Injectable()
export class CentralAuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<ValidateUserReturnResponse> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: username,
      },
    });

    if (user && user.password === password) {
      const userResponse: ValidateUserReturnResponse = {
        name: user.name,
        email: user.email,
        role: user.role,
      };
      return userResponse;
    }

    return null;
  }
}
