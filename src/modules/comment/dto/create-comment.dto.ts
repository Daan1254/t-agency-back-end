import { IsNotEmpty } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    activityUuid: string;

    @IsNotEmpty()
    text: string;
}