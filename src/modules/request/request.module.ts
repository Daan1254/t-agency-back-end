import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Request, Session, User } from "src/typeorm";
import { AuthService } from "../auth/auth.service";
import { RequestController } from "./request.controller";
import { RequestService } from "./request.service";

@Module({
    controllers: [RequestController],
    exports: [],
    imports: [TypeOrmModule.forFeature([Request, User, Session])],
    providers: [RequestService, AuthService]
})
export class RequestModule {}