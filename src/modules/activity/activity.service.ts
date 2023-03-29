import { Injectable } from "@nestjs/common";
import { CreateActivityDto } from "./dto/create-activity.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Activity } from "../../typeorm";

@Injectable()
export class ActivityService {
  constructor(@InjectRepository(Activity) private readonly activityRepository: Repository<Activity>) {
  }

  async createActivity(body: CreateActivityDto) {
    const activity = this.activityRepository.create(body);

    return await this.activityRepository.save(activity);
  }


  async getActivities() {
    return await this.activityRepository.find();
  }

  async getActivity(uuid: string) {
    return await this.activityRepository.findOne({
      where: {
        uuid
      },
      relations: ['comments']
    })
  }
}
