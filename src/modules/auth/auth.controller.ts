import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { AuthGuard, RequestWithAuth } from "./auth.guard";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  public async createUser(@Body() body: CreateUserDto) {
    return await this.authService.createUser(body);
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  public async login(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }

  @Get('/validate')
  @UseGuards(AuthGuard)
  public async validate(@Req() request: RequestWithAuth) {
    return request.user;
  }
}
