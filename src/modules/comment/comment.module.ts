import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Activity, Comment, Session, User } from "src/typeorm";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Session, Activity])],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [],
})
export class CommentModule {}
