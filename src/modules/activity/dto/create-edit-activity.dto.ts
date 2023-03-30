import { IsNotEmpty } from "class-validator";

export class CreateEditActivityDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  bannerImageUrl: string;

  @IsNotEmpty()
  date: string

}
