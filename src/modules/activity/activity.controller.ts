import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Delete, Put, Req } from "@nestjs/common/decorators";
import { AuthGuard, RequestWithAuth } from "../auth/auth.guard";
import { ActivityService } from "./activity.service";
import { CreateEditActivityDto } from "./dto/create-edit-activity.dto";

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {
  }


  @Post('/')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async createActivity(@Body() body: CreateEditActivityDto, @Req() req: RequestWithAuth) {
    return await this.activityService.createActivity(body, req.user);
  }

  @Get('/')
  async getActivities() {
    return await this.activityService.getActivities();
  }

  @Put(':uuid')
  @UseGuards(AuthGuard)
  async updateActivity(@Param('uuid') uuid: string, @Body() body: CreateEditActivityDto) {
    return await this.activityService.updateActivity(uuid, body)
  }

  @Delete(':uuid')
  @UseGuards(AuthGuard)
  async deleteActivity(@Param('uuid') uuid: string) {
    return await this.activityService.deleteActivity(uuid)
  }

  @Get('/:uuid')
  async getActivity(@Param('uuid') uuid: string) {
    return await this.activityService.getActivity(uuid);
  }
}
