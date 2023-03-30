import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Vote } from "./vote.entity";

@Entity() 
export class Poll {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    title: string;

    @OneToMany(() => Vote, (vote) => vote.poll)
    votes: Vote[]

    @ManyToOne(() => User, (user) => user.polls)
    user: User
}