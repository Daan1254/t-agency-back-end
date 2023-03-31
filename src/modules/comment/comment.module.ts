import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Activity, Comment, Session, User } from "src/typeorm";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { AuthService } from "../auth/auth.service";
import { VotingModule } from "../voting/voting.module";

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Session, Activity]), VotingModule],
  controllers: [CommentController],
  providers: [CommentService, AuthService],
  exports: [],
})
export class CommentModule {}
