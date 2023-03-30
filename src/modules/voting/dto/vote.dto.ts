import { IsEnum, IsNotEmpty } from "class-validator";
import { VoteDicision } from "src/typeorm/vote.entity";

export class VoteDto {
    @IsNotEmpty()
    @IsEnum(VoteDicision)
    dicision: VoteDicision
}