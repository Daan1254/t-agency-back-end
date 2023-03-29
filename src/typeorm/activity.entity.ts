import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment} from "./comment.entity";

@Entity()
export class Activity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column()
  title: string

  @Column()
  description: string;

  @Column()
  bannerImageUrl: string

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @OneToMany(() => Comment, (comment) => comment.activity)
  comments: Comment[];

}
