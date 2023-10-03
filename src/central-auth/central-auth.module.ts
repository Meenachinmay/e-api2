import { Module } from '@nestjs/common';
import { CentralAuthController } from './central-auth.controller';
import { CentralAuthService } from './central-auth.service';
import { PrismaService } from 'src/prisma.service';
import { LocalStrategy } from './__strategies__/LocalStrategy';

@Module({
  controllers: [CentralAuthController],
  providers: [CentralAuthService, PrismaService, LocalStrategy],
})
export class CentralAuthModule {}
