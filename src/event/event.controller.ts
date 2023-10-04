import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AppEvent } from 'src/types/event.type';
import { CreateEventDto } from '../dtos/create-event.dto';
import { EventsService } from './event.service';
import { AuthenticatedGuard } from 'src/central-auth/__guards__/Guards';

@Controller('api/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('create-event')
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }

  @UseGuards(AuthenticatedGuard)
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

  @Get('get-event')
  async getEvent(
    @Query('id') id: number,
  ): Promise<{ message: string; __event: AppEvent }> {
    return this.eventsService.getEventById(id);
  }
}
