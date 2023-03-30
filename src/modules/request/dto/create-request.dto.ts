import { IsNotEmpty } from "class-validator";

export class CreateRequestDto {
    @IsNotEmpty()
    idea: string;

    @IsNotEmpty()
    description: string;
}