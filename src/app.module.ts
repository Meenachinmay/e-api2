import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { EventModule } from './event/event.module';
import { EventsController } from './event/event.controller';
import { EventsService } from './event/event.service';
import { PassportModule } from '@nestjs/passport';
import { CommentController } from './comment/comment.controller';
import { CommentService } from './comment/comment.service';
import { CommentModule } from './comment/comment.module';
import { ConfigModule } from '@nestjs/config';

// import { KafkaService } from './kafka/kafka.service';
import { EventorgauthController } from './eventorgauth/eventorgauth.controller';
import { EventorgauthService } from './eventorgauth/eventorgauth.service';
import { EventorgauthModule } from './eventorgauth/eventorgauth.module';
import { CentralAuthModule } from './central-auth/central-auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventModule,
    PassportModule.register({ session: true }),
    CommentModule,
    EventorgauthModule,
    CentralAuthModule,
  ],
  controllers: [
    AppController,
    EventsController,
    CommentController,
    EventorgauthController,
  ],
  providers: [
    AppService,
    PrismaService,
    EventsService,
    CommentService,
    // KafkaService,
    EventorgauthService,
  ],
  exports: [AppService],
})
export class AppModule {}
