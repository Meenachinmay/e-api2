import { Test, TestingModule } from '@nestjs/testing';
import { EventsService as EventService } from '../../event/event.service';
import { CommentService as CommentsService } from '../../comment/comment.service';
import { PrismaService } from '../../prisma.service';
import { CreateEventDto } from 'src/dtos/create-event.dto';
import { ImageDto } from 'src/dtos/image.dto';

describe('Integration Test for Event and Comment', () => {
  let eventService: EventService;
  let commentsService: CommentsService;

  const mockPrismaService = {
    event: {
      create: jest.fn().mockResolvedValue({
        // ... mock event data
        id: 1,
        title: 'Test Title',
        description: 'Test Description',
        images: ['http://url.com/image', 'http://urlb.com/image'],
        tags: ['tag1', 'tag2'],
        activities: ['sport', 'action'],
        omiyage: ['choco', 'cake'],
        snsLinks: ['http://sns1.com', 'http://sns2.com'],
        city: 'Osaka',
        prefecture: 'Osaka',
        createdAt: new Date(),
      }),
      findUnique: jest.fn().mockResolvedValue({
        id: 1,
        title: 'Test Title',
        description: 'Test Description',
        images: ['http://url.com/image', 'http://urlb.com/image'],
        tags: ['tag1', 'tag2'],
        activities: ['sport', 'action'],
        omiyage: ['choco', 'cake'],
        snsLinks: ['http://sns1.com', 'http://sns2.com'],
        city: 'Osaka',
        prefecture: 'Osaka',
        comments: [
          {
            id: 1,
            content: 'This Content',
            rating: 5,
            eventId: 1,
          },
        ],
        createdAt: new Date(),
      }),
    },
    comment: {
      create: jest.fn().mockResolvedValue({
        // ... mock comment data
        id: 1,
        content: 'Test Content',
        rating: 5,
        eventId: 1,
      }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        CommentsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();
    eventService = module.get<EventService>(EventService);
    commentsService = module.get<CommentsService>(CommentsService);
  });

  it('should create an event and associate a comment', async () => {
    // Step 1: Create an event
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

    const createdEvent = await eventService.createEvent(createEventDto);
    expect(createdEvent.event.title).toBe('Test Title');
    expect(createdEvent.event.description).toBe('Test Description');
    expect(createdEvent.event.images).toEqual([
      'http://url.com/image',
      'http://urlb.com/image',
    ]);
    expect(createdEvent.event.comments).toEqual([]);

    // Step 2: Create a comment associated with the event
    const createCommentDto = {
      content: 'Test Content',
      rating: 5,
      eventId: createdEvent.event.id, // use the event ID from the created event
    };

    const createdComment =
      await commentsService.createComment(createCommentDto);

    expect(createdComment.content).toBe('Test Content');
    expect(createdComment.rating).toBe(5);
    expect(createdComment.eventId).toBe(createdEvent.event.id);

    // Step 3: Validate that the comment is associated with the event
    // (This step will depend on how you've implemented your service logic)
    const eventWithComment = await eventService.getEventById(
      createdEvent.event.id,
    );

    expect(eventWithComment.__event.comments).toBeDefined();
    expect(eventWithComment.__event.comments.length).toBe(1);
    expect(eventWithComment.__event.comments).toMatchObject([
      { content: 'This Content', eventId: 1, id: 1, rating: 5 },
    ]);
  });
});
