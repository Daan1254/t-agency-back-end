import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Session {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @ManyToOne(() => User, (user) => user.sessions)
  user: User;

  @Column()
  token: string;

  @Column({
    type: "timestamp",
  })
  expiresAt: Date;
}
