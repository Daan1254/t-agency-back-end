import { Injectable } from "@nestjs/common";
import { BadRequestException } from "@nestjs/common/exceptions";
import { ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "src/typeorm";
import { RequestStatus } from "src/typeorm/request.entity";
import { UserDto } from "../auth/dto/user.dto";
import { CreateRequestDto } from "./dto/create-request.dto";

@ApiTags('Requests')
@Injectable()
export class RequestService {
    constructor(@InjectRepository(Request) private readonly requestRepository) {}


    async createRequest(body: CreateRequestDto, user: UserDto) {
        const request = await this.requestRepository.create({
            ... body,
            user
        })

        return await this.requestRepository.save(request)
    }

    async getRequests() {
        return await this.requestRepository.find({
            relations: ['user']
        })
    }

    async deleteRequest(uuid: string) {
        const request = await this.requestRepository.findOne({
            where: {
                uuid
            }
        })

        if (!request) {
            throw new BadRequestException('Request not found')
        }

        return await this.requestRepository.remove(request);
    }

    async approveRequest(uuid: string) {
        const request = await this.requestRepository.findOne({
            where: {
                uuid
            }
        })

        if (!request) {
            throw new BadRequestException('Request not found')
        }

        return await this.requestRepository.save({
            ... request,
            status: RequestStatus.APPROVED
        })
    }
}