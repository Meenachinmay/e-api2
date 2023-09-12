import { Test, TestingModule } from '@nestjs/testing';
import { EventsService as EventService } from './event.service';
import { PrismaService } from '../prisma.service';

describe('EventService', () => {
  let service: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventService, PrismaService],
    }).compile();

    service = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an event', async () => {
    const createEventDto = {
      id: 1,
      title: 'Test Title',
      description: 'Test Description',
      images: [
        { url: 'http://url.com/image' },
        { url: 'http://urlb.com/image' },
      ],
      tags: ['tag1', 'tag2'],
      activities: ['sport', 'action'],
      omiyage: ['choco', 'cake'],
      snsLinks: ['http://sns1.com', 'http://sns2.com'],
      city: 'Osaka',
      prefecture: 'Osaka',
      createdAt: new Date(),
    };
    const createdEvent = await service.createEvent(createEventDto);

    expect(createdEvent).toBeDefined();
    expect(createEventDto.title).toBe(createEventDto.title);
  });
});
