import { Injectable } from "@nestjs/common";
import { CreateEditActivityDto } from "./dto/create-edit-activity.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Activity } from "../../typeorm";
import { UserDto } from "../auth/dto/user.dto";
import { BadRequestException } from "@nestjs/common/exceptions";

@Injectable()
export class ActivityService {

 
  constructor(@InjectRepository(Activity) private readonly activityRepository: Repository<Activity>) {
  }

  async createActivity(body: CreateEditActivityDto, user: UserDto) {
    const activity = this.activityRepository.create({
      ...body,
      user
    });

    return await this.activityRepository.save(activity);
  }

  async deleteActivity(uuid: string) {
    const activity = await this.activityRepository.findOne({
      where: {
        uuid
      }
    }) 


    if (!activity) {
      throw new BadRequestException("Activity does not exists")
    }


    return await this.activityRepository.remove(activity);
  }

  async updateActivity(uuid: string, body: CreateEditActivityDto) {
    const activity = await this.activityRepository.findOne({
      where: {
        uuid
      }
    }) 


    if (!activity) {
      throw new BadRequestException("Activity does not exists")
    }

    return await this.activityRepository.save({
      ...activity,
      ...body
    })
  }


  async getActivities() {
    return await this.activityRepository.find({
      relations: ['user']
    });
  }

  async getActivity(uuid: string) {
    return await this.activityRepository.findOne({
      where: {
        uuid
      },
      relations: ['comments', 'user']
    })
  }
}
