import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { CreateEventDto } from 'src/dtos/create-event.dto';
import { EventsService } from './event.service';
import { AppEvent } from 'src/types/event.type';

@Controller('api/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('create-event')
  async createEvent(@Body() createEventDto: CreateEventDto, @Req() req) {
    return this.eventsService.createEvent(createEventDto);
  }

  @Get('get-events')
  async getEvents(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ): Promise<{ message: string; events: AppEvent[] }> {
    return this.eventsService.getEvents(
      limit ? parseInt(limit, 10) : undefined,
      offset ? parseInt(offset, 10) : undefined,
    );
  }
}
