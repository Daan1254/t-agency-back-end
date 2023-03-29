import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../typeorm";
import { AuthService } from "./auth.service";

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
