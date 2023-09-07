import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './utilities/GoogleStrategy';
import { PrismaService } from 'src/prisma.service';
import { SessionSerializer } from './utilities/Serializer';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, PrismaService, SessionSerializer],
})
export class AuthModule {}
