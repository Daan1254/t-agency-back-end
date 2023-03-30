import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Session, User } from "../../typeorm";
import { AuthService } from "./auth.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Session])],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
