import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEventDto } from 'src/dtos/create-event.dto';
import { AppEvent } from 'src/types/event.type';
import { Prisma } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  // CREATE A NEW EVENT HERE---
  async createEvent(
    createEventDto: CreateEventDto,
  ): Promise<{ message: string; event: AppEvent }> {
    // No need for transformation or serialization
    const images = createEventDto.images.map(
      (imageDto) => imageDto.url,
    ) as Prisma.JsonArray;
    const tags = createEventDto.tags as Prisma.JsonArray;
    const activities = createEventDto.activities as Prisma.JsonArray;
    const omiyage = createEventDto.omiyage as Prisma.JsonArray;
    const snsLinks = createEventDto.snsLinks as Prisma.JsonArray;

    console.log('date from request', createEventDto.date);

    try {
      const createdEvent = await this.prisma.event.create({
        data: {
          title: createEventDto.title,
          description: createEventDto.description,
          date: createEventDto.date.toString(),
          images,
          tags,
          activities,
          omiyage,
          snsLinks,
          city: createEventDto.city,
          prefecture: createEventDto.prefecture,
        },
      });

      const event: AppEvent = {
        id: createdEvent.id,
        title: createdEvent.title,
        description: createdEvent.description,
        date: createdEvent.date,
        images: createdEvent.images as Prisma.JsonArray,
        tags: createdEvent.tags as Prisma.JsonArray,
        activities: createdEvent.activities as Prisma.JsonArray,
        omiyage: createdEvent.omiyage as Prisma.JsonArray,
        snsLinks: createdEvent.snsLinks as Prisma.JsonArray,
        city: createdEvent.city,
        prefecture: createdEvent.prefecture,
        comments: [],
        createdAt: createdEvent.createdAt,
      };

      return {
        message: 'Event created successfully',
        event: event,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException('Error creating event', HttpStatus.BAD_REQUEST);
    }
  }

  // FETCH EVENTS HERE
  async getEvents(
    limit?: number,
    offset?: number,
  ): Promise<{ message: string; events: AppEvent[] }> {
    try {
      const events = await this.prisma.event.findMany({
        take: limit,
        skip: offset,
        include: {
          comments: true,
        },
      });

      const transformedEvents = events.map((createdEvent) => {
        return {
          id: createdEvent.id,
          title: createdEvent.title,
          description: createdEvent.description,
          date: createdEvent.date,
          images: createdEvent.images as Prisma.JsonArray,
          tags: createdEvent.tags as Prisma.JsonArray,
          activities: createdEvent.activities as Prisma.JsonArray,
          omiyage: createdEvent.omiyage as Prisma.JsonArray,
          snsLinks: createdEvent.snsLinks as Prisma.JsonArray,
          city: createdEvent.city,
          prefecture: createdEvent.prefecture,
          comments: createdEvent.comments,
          createdAt: createdEvent.createdAt,
        } as unknown as AppEvent;
      });

      return {
        message: 'Events fetched successfully',
        events: transformedEvents,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException('Error creating event', HttpStatus.BAD_REQUEST);
    }
  }

  // get an event with unique ID
  async getEventById(
    id: number,
  ): Promise<{ message: string; __event: AppEvent }> {
    const __id = Number(id);
    try {
      const customEvent = await this.prisma.event.findUnique({
        where: {
          id: __id,
        },
        include: {
          comments: true,
        },
      });

      // transforming the event return type
      const transformedEvent = {
        id: customEvent.id,
        title: customEvent.title,
        description: customEvent.description,
        date: customEvent.date,
        images: customEvent.images as Prisma.JsonArray,
        tags: customEvent.tags as Prisma.JsonArray,
        activities: customEvent.activities as Prisma.JsonArray,
        omiyage: customEvent.omiyage as Prisma.JsonArray,
        snsLinks: customEvent.snsLinks as Prisma.JsonArray,
        city: customEvent.city,
        prefecture: customEvent.prefecture,
        comments: customEvent.comments,
        createdAt: customEvent.createdAt,
      } as unknown as AppEvent;

      return {
        message: 'Event fetched successfully',
        __event: transformedEvent,
      };
    } catch (error) {
      console.error('Error in findUnique:', error);
    }
  }
}
