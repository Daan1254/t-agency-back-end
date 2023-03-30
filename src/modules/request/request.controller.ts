import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard, RequestWithAuth } from "../auth/auth.guard";
import { CreateRequestDto } from "./dto/create-request.dto";
import { RequestService } from "./request.service";
@ApiTags('Requests')
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

    @Get('/approve/:uuid') 
    @UseGuards(AuthGuard)
    async approveStatus(@Param('uuid') uuid: string) {
        return await this.requestService.approveRequest(uuid)
    }

    @Delete(':uuid')
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard)
    async removeRequest(@Param('uuid') uuid: string) {
        return this.requestService.deleteRequest(uuid);
    }   
    

}
