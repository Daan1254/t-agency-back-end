import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import { Session } from "./session.entity";
import { Comment } from './comment.entity'
import { Request } from "./request.entity";
import { Activity } from "./activity.entity";
import { Vote } from "./vote.entity";
import { Poll } from "./poll.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @ManyToOne(() => Session, (session) => session.user)
  sessions: Session[];

  @ManyToOne(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @ManyToOne(() => Request, (request) => request.user)
  requests: Request[]

  @ManyToOne(() => Activity, (activity) => activity.user)
  activities: Activity[]

  @ManyToOne(() => Poll, (poll) => poll.user)
  polls: Poll[]

  @ManyToOne(() => Vote, (vote) => vote.user)
  votes: Vote[]

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
