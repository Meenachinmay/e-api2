import { Module } from '@nestjs/common';
import { CentralAuthController } from './central-auth.controller';
import { CentralAuthService } from './central-auth.service';
import { PrismaService } from 'src/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [PassportModule],
  controllers: [CentralAuthController],
  providers: [CentralAuthService, PrismaService, LocalStrategy],
})
export class CentralAuthModule {}
