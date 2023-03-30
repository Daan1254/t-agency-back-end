import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Session, User } from "../../typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import * as crypto from 'crypto'
import {compareSync} from "bcrypt";

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
              @InjectRepository(Session) private readonly sessionRepository: Repository<Session>) {

  }


  async createUser(createUserDto: CreateUserDto): Promise<User> {

    const user = await this.userRepository.findOne({where: {email: createUserDto.email}});

    if (user) {
      throw new BadRequestException('User already exists')
    }

    const newUser = this.userRepository.create(createUserDto);

    if (!newUser) {
      throw new BadRequestException('User not created')
    }

    await this.userRepository.save(newUser);
    return newUser;
  }

  async login(body: LoginDto) {
    const user = await this.userRepository.findOne({where: {email: body.email}});


    if (!user) {
      throw new BadRequestException('User not found')
    }

    if (!compareSync(body.password, user.password)) {
      throw new BadRequestException('Password is incorrect')
    }

    const session = this.sessionRepository.create({
      user: user,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 3),
      token: crypto.randomBytes(64).toString('hex')
    })

    await this.sessionRepository.save(session);

    return {token: session.token};
  }

  async validate(token: string) {
    const session = await this.sessionRepository.findOne({where: {token: token}, relations: ['user']});

    if (!session) {
      throw new BadRequestException('Session not found')
    }

    if (session.expiresAt < new Date()) {
      throw new BadRequestException('Session expired')
    }

    return session.user;
  }
}
