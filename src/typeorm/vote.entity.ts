import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Poll } from "./poll.entity";
import { User } from "./user.entity";

export enum VoteDicision {
    UPVOTE = "UPVOTE",
    DOWNVOTE = "DOWNVOTE"  
}

@Entity() 
export class Vote {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @ManyToOne(() => User, (user) => user.votes)
    user: User


    @ManyToOne(() => Poll, (poll) => poll.votes)
    poll: Poll


    @Column({
        enum: VoteDicision
    })
    dicision: VoteDicision
}