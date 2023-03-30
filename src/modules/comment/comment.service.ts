import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Activity, Comment } from "../../typeorm";
import { Repository } from "typeorm";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UserDto } from "../auth/dto/user.dto";

@Injectable()
export class CommentService {
  constructor(@InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
              @InjectRepository(Activity) private readonly activityRepository: Repository<Activity>) {}

  async createComment(body: CreateCommentDto, user: UserDto) {
    const activity = await this.activityRepository.findOne({
      where: {
        uuid: body.activityUuid
      }
    })

    if (!activity) {
      throw new BadRequestException('Activity does not exists')
    }

    const comment = this.commentRepository.create({
      text: body.text,
      activity,
      user,
    })
    

    return await this.commentRepository.save(comment)
  }

}
