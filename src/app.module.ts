import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { EventModule } from './event/event.module';
import { EventsController } from './event/event.controller';
import { EventsService } from './event/event.service';

@Module({
  imports: [EventModule],
  controllers: [AppController, EventsController],
  providers: [AppService, PrismaService, EventsService],
})
export class AppModule {}
