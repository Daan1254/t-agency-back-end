import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard, RequestWithAuth } from "../auth/auth.guard";
import { CreateRequestDto } from "./dto/create-request.dto";
import { RequestService } from "./request.service";

@Controller('request')
export class RequestController {
    constructor(private readonly requestService: RequestService){}

    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard)
    async createRequest(@Body() body: CreateRequestDto, @Req() req: RequestWithAuth) {
        return this.requestService.createRequest(body, req.user)
    }


    @Get()
    async getRequest() {
        return await this.requestService.getRequests() 
    }
    

}
