import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from 'src/types/user.type';
import { compareHash } from './__utils__/helpers';

export type ValidateUserReturnResponse = Omit<User, 'password'>;

@Injectable()
export class CentralAuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new HttpException(
        'Invalid Credentials or You are not registered yet.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordValid = compareHash(password, user.password);
    return isPasswordValid ? user : null;
  }
}
