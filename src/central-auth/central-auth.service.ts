import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from 'src/types/user.type';

export type ValidateUserReturnResponse = Omit<User, 'password'>;

@Injectable()
export class CentralAuthService {
  constructor(private readonly prismaService: PrismaService) {}
}
