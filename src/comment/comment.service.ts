import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from 'src/dtos/create-comment.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async createComment(data: CreateCommentDto) {
    try {
      return this.prisma.comment.create({
        data: {
          content: data.content,
          rating: data.rating,
          event: {
            connect: {
              id: data.eventId,
            },
          },
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Could not create comment',
          info: error.message, // additional information
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
