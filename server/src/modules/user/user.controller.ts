import { UserService } from './user.service';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getUsers(@Query('id') id: number): Promise<User | User[]> {
    return this.userService.getUser(id);
  }
}
