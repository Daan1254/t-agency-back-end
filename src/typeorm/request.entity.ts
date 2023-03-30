import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

export enum RequestStatus {
    APPROVED = "APPROVED",
    DECLINED = "DECLINED",
    PENDING = "PENDING",
}

@Entity()
export class Request {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @ManyToOne(() => User, (user) => user.requests)
    user: User


    @Column()
    idea: string;

    @Column()
    description: string

    @Column({
        enum: RequestStatus,
        default: RequestStatus.PENDING
    })
    status: RequestStatus

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date
}