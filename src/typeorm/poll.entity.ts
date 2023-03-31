import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Vote } from "./vote.entity";
import { Comment } from "./comment.entity";

@Entity() 
export class Poll {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    title: string;

    @OneToMany(() => Vote, (vote) => vote.poll)
    votes: Vote[]


    @OneToOne(() => Comment, (comment) => comment.poll)
    comment: Comment

    @ManyToOne(() => User, (user) => user.polls)
    user: User
}