import { UserService } from './user.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getUsers(@Query('id') id: number): Promise<User | User[] | number> {
    return this.userService.findById(id);
  }

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  async registerUser(@Body() user: User): Promise<void> {
    return this.userService.addUser(user);
  }
}
