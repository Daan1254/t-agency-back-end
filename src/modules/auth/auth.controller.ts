import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  public async createUser(@Body() body: CreateUserDto) {
    return await this.authService.createUser(body);
  }
}
