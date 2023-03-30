import { Type } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";
import { UserDto } from "src/modules/auth/dto/user.dto";
import { Activity } from "src/typeorm";

export class CommentDto {
    @IsNotEmpty()
    uuid: string;

    @IsNotEmpty()
    text: string;

    @IsDate()
    createdAt: Date

    @Type(() => UserDto)
    user: UserDto

    @Type(() => Activity)
    activity: Activity
}