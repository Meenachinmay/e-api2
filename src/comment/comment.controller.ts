import { Body, Controller, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from 'src/dtos/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentsService: CommentService) {}

  @Post()
  async createComment(@Body() data: CreateCommentDto) {
    return this.commentsService.createComment(data);
  }
}
