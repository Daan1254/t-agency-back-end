import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Activity } from './activity.entity';
import { Poll } from './poll.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  text: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @OneToOne(() => Poll, (poll) => poll.comment, {
    nullable: true,
  })
  @JoinColumn()
  poll: Poll;

  @ManyToOne(() => Activity, (activity) => activity.comments)
  activity: Activity;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}
