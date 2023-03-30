import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "src/typeorm";
import { UserDto } from "../auth/dto/user.dto";
import { CreateRequestDto } from "./dto/create-request.dto";

@Injectable()
export class RequestService {

    constructor(@InjectRepository(Request) private readonly requestRepository) {}


    async createRequest(body: CreateRequestDto, user: UserDto) {
        const request = await this.requestRepository.create({
            ... body,
            user
        })

        console.log(request)


        return await this.requestRepository.save(request)
    }

    async getRequests() {
        return await this.requestRepository.find({
            relations: ['user']
        })
    }
}