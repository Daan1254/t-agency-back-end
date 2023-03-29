import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ActivityService } from "./activity.service";
import { CreateActivityDto } from "./dto/create-activity.dto";

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {
  }


  @Post('/')
  @UsePipes(ValidationPipe)
  async createActivity(@Body() body: CreateActivityDto) {
    return await this.activityService.createActivity(body);
  }

  @Get('/')
  async getActivities() {
    return await this.activityService.getActivities();
  }

  @Get('/:uuid')
  async getActivity(@Param('uuid') uuid: string) {
    return await this.activityService.getActivity(uuid);
  }
}
