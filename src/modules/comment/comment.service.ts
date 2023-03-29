import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "../../typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CommentService {
  constructor(@InjectRepository(Comment) private readonly commentRepository: Repository<Comment>) {}


}
