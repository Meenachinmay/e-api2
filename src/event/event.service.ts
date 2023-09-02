import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEventDto } from 'src/dtos/create-event.dto';
import { AppEvent } from 'src/types/event.type';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async createEvent(
    createEventDto: CreateEventDto,
  ): Promise<{ message: string; event: AppEvent }> {
    // Transform ImageDto array to a simple array of strings.
    const images = createEventDto.images.map((imageDto) => imageDto.url);

    // Serialize arrays to JSON strings
    const serializedImages = JSON.stringify(images);
    const serializedTags = JSON.stringify(createEventDto.tags);
    const serializedActivities = JSON.stringify(createEventDto.activities);
    const serializedOmiyage = JSON.stringify(createEventDto.omiyage);
    const serializedSnsLinks = JSON.stringify(createEventDto.snsLinks);

    const createdEvent = await this.prisma.event.create({
      data: {
        title: createEventDto.title,
        description: createEventDto.description,
        images: serializedImages,
        tags: serializedTags,
        activities: serializedActivities,
        omiyage: serializedOmiyage,
        snsLinks: serializedSnsLinks,
        city: createEventDto.city,
        prefecture: createEventDto.prefecture,
      },
    });

    const event: AppEvent = {
      id: createdEvent.id,
      title: createdEvent.title,
      description: createdEvent.description,
      images: JSON.parse(createdEvent.images),
      tags: JSON.parse(createdEvent.tags),
      activities: JSON.parse(createdEvent.activities),
      omiyage: JSON.parse(createdEvent.omiyage),
      snsLinks: JSON.parse(createdEvent.snsLinks),
      city: createdEvent.city,
      prefecture: createdEvent.prefecture,
      createdAt: createdEvent.createdAt,
    };

    return {
      message: 'Event created successfully',
      event: event,
    };
  }

  // fetch all the events
  async getEvents(
    limit?: number,
    offset?: number,
  ): Promise<{ message: string; events: AppEvent[] }> {
    const events = await this.prisma.event.findMany({
      take: limit,
      skip: offset,
    });

    const transformedEvents = events.map((customEvent) => {
      return {
        id: customEvent.id,
        title: customEvent.title,
        description: customEvent.description,
        images: JSON.parse(customEvent.images),
        tags: JSON.parse(customEvent.tags),
        activities: JSON.parse(customEvent.activities),
        omiyage: JSON.parse(customEvent.omiyage),
        snsLinks: JSON.parse(customEvent.snsLinks),
        city: customEvent.city,
        prefecture: customEvent.prefecture,
        createdAt: customEvent.createdAt,
      } as AppEvent;
    });

    return {
      message: 'Events fetched successfully',
      events: transformedEvents,
    };
  }
}
