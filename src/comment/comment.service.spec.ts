import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from './comment.service';
import { PrismaService } from '../prisma.service';

describe('CommentService', () => {
  let service: CommentService;
  const mockPrismaService = {
    comment: {
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createComment', () => {
    it('should create a comment', async () => {
      // Mocking the Prisma Service to simulate comment creation
      mockPrismaService.comment.create.mockResolvedValue({
        id: 1,
        content: 'This is a test comment',
        rating: 4.5,
        eventId: 1,
      });

      const newComment = {
        content: 'This is a test comment',
        rating: 4.5,
        eventId: 1,
      };

      const result = await service.createComment(newComment);

      // Making sure we're connecting the event and comment in the test
      expect(mockPrismaService.comment.create).toHaveBeenCalledWith({
        data: {
          content: 'This is a test comment',
          rating: 4.5,
          event: {
            connect: {
              id: 1,
            },
          },
        },
      });

      expect(result.content).toBe('This is a test comment');
      expect(result.rating).toBe(4.5);
      expect(result.eventId).toBe(1);
    });
  });
});
