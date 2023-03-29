import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Activity } from "./activity.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column()
  text: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => Activity, (activity) => activity.comments)
  activity: Activity;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}
