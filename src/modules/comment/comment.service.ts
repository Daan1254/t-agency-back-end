import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Activity, Comment } from "../../typeorm";
import { Repository } from "typeorm";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UserDto } from "../auth/dto/user.dto";
import { VotingService } from "../voting/voting.service";

@Injectable()
export class CommentService {
  constructor(@InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
              @InjectRepository(Activity) private readonly activityRepository: Repository<Activity>,
              private readonly votingService: VotingService) {}

  async createComment(body: CreateCommentDto, uuid: string, user: UserDto) {
    let poll = null
    const activity = await this.activityRepository.findOne({
      where: {
        uuid
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

    if (body.pollTitle) {
      poll = await this.votingService.createPoll({
        title: body.pollTitle
      }, user)
    }
    

    return await this.commentRepository.save({
      ...comment,
      poll
    })
  }

}
