import { IsNotEmpty } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    text: string;


    pollTitle: string;
}