import { UserService } from './user.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get()
  // @UseInterceptors(ClassSerializerInterceptor)
  // async getUsers(@Query('id') id: number): Promise<User | User[]> {
  //   return this.userService.getUser(id);
  // }

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  async registerUser(@Body() user: User): Promise<void> {
    return this.userService.addUser(user);
  }
}
