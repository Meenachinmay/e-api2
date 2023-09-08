import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { EventModule } from './event/event.module';
import { EventsController } from './event/event.controller';
import { EventsService } from './event/event.service';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    EventModule,
    AuthModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController, EventsController],
  providers: [AppService, PrismaService, EventsService],
})
export class AppModule {}
