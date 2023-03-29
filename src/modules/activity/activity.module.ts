import { Module } from "@nestjs/common";
import { ActivityController } from "./activity.controller";
import { ActivityService } from "./activity.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Activity } from "../../typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Activity])],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [],
})
export class ActivityModule {}
