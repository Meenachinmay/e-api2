import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { EventModule } from './event/event.module';
import { EventsController } from './event/event.controller';
import { EventsService } from './event/event.service';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { CommentController } from './comment/comment.controller';
import { CommentService } from './comment/comment.service';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    EventModule,
    AuthModule,
    PassportModule.register({ session: true }),
    CommentModule,
  ],
  controllers: [AppController, EventsController, CommentController],
  providers: [AppService, PrismaService, EventsService, CommentService],
})
export class AppModule {}
