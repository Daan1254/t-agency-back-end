import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { UserDto } from './dto/user.dto';

export interface RequestWithAuth extends Request {
  user: UserDto;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const user = await this.authService.validate(
      request.headers['authorization'],
    );
    delete user.password;
    request.user = user;

    return user;
  }
}
