import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import { Session } from "./session.entity";
import { Comment } from './comment.entity'
import { Request } from "./request.entity";

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
