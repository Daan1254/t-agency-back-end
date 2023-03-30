import { Module } from "@nestjs/common";
import { ActivityController } from "./activity.controller";
import { ActivityService } from "./activity.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Activity, Session, User } from "../../typeorm";
import { AuthService } from "../auth/auth.service";

@Module({
  imports: [TypeOrmModule.forFeature([Activity, User, Session])],
  controllers: [ActivityController],
  providers: [ActivityService, AuthService],
  exports: [],
})
export class ActivityModule {}
