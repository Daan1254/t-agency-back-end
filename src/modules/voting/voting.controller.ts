import { Body, Controller, Get, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard, RequestWithAuth } from "../auth/auth.guard";
import { CreatePollDto } from "./dto/create-poll.dto";
import { VoteDto } from "./dto/vote.dto";
import { VotingService } from "./voting.service";

@Controller('voting')
export class VotingController {
    constructor(private readonly votingService: VotingService) {}


    @Get()
    @UseGuards(AuthGuard)
    async getPolls() {
        return await this.votingService.getPolls()
    } 


    @Post(':uuid')
    @UsePipes(ValidationPipe) 
    @UseGuards(AuthGuard)
    async votePoll(@Body() body: VoteDto, @Req() req: RequestWithAuth, @Param('uuid') uuid: string) {
        return await this.votingService.vote(body, uuid, req.user)
    }


    @Post()
    @UsePipes(ValidationPipe) 
    @UseGuards(AuthGuard)
    async createPoll(@Body() body: CreatePollDto, @Req() req: RequestWithAuth) {
        return await this.votingService.createPoll(body, req.user)
    }
}