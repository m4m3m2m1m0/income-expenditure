import { UserService } from './user.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getUsers(
    @Query('id') id: number,
    @Req() req,
  ): Promise<User | User[] | number> {
    return this.userService.findById(id);
  }

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  async registerUser(@Body() user: User): Promise<void> {
    return this.userService.addUser(user);
  }
}
