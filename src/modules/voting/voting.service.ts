import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Poll, Vote } from "src/typeorm";
import { Repository } from "typeorm";
import { UserDto } from "../auth/dto/user.dto";
import { CreatePollDto } from "./dto/create-poll.dto";
import { VoteDto } from "./dto/vote.dto";

@Injectable()
export class VotingService {



    constructor(
    @InjectRepository(Poll) private readonly pollRepository: Repository<Poll>,
    @InjectRepository(Vote) private readonly voteRepository: Repository<Vote>) {}

    async getPolls() {
        return await this.pollRepository.find({
            relations: ['votes', 'user', 'votes.user']
        })
    }


    async createPoll(body: CreatePollDto, user: UserDto) {
        const poll = this.pollRepository.create({
            ...body,
            user
        })


        return await this.pollRepository.save(poll);
    }

    async deletePoll(uuid: any) {
        const poll = await this.pollRepository.findOne({
            where: {
                uuid
            },
            relations: ['votes']
        })

        if (!poll) {
            throw new BadRequestException('Poll does not exists')
        }

        poll.votes.forEach((vote) => {
            this.voteRepository.remove(vote)
        })

        return await this.pollRepository.remove(poll);
    }

    async vote(body: VoteDto,uuid: string, user: UserDto) {
        const poll = await this.pollRepository.findOne({
            where: {
                uuid
            },
            relations: ['votes', 'user', 'votes.user']
        })

        if (!poll) {
            throw new BadRequestException('Poll does not exists')
        }

        if (poll.votes.filter((vote) => vote.user.uuid === user.uuid).length > 0) {
            throw new BadRequestException('U hebt al gestemt op deze poll')
        }

        const vote = this.voteRepository.create({
            dicision: body.dicision,
            poll,
            user
        })

        return await this.voteRepository.save(vote);
    }
}