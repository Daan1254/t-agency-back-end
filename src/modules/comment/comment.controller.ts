import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard, RequestWithAuth } from '../auth/auth.guard';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('Comments')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':uuid')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async createComment(
    @Param('uuid') uuid: string,
    @Body() body: CreateCommentDto,
    @Req() req: RequestWithAuth,
  ) {
    return await this.commentService.createComment(body, uuid, req.user);
  }
}
