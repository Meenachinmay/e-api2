import { Module } from '@nestjs/common';
import { CentralAuthController } from './central-auth.controller';
import { CentralAuthService } from './central-auth.service';
import { PrismaService } from 'src/prisma.service';
import { LocalStrategy } from './__strategies__/LocalStrategy';
import { SessionSerializer } from './__data-serialization__/Serializer';

@Module({
  controllers: [CentralAuthController],
  providers: [
    CentralAuthService,
    PrismaService,
    LocalStrategy,
    SessionSerializer,
  ],
})
export class CentralAuthModule {}
