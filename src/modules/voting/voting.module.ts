import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Poll, Session, User, Vote } from "src/typeorm";
import { AuthService } from "../auth/auth.service";
import { VotingController } from "./voting.controller";
import { VotingService } from "./voting.service";

@Module({
    controllers: [VotingController],
    exports: [VotingService],
    imports: [TypeOrmModule.forFeature([User, Session, Vote, Poll])],
    providers: [VotingService, AuthService]
})
export class VotingModule {}