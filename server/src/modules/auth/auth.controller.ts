import { LoginCredentials } from './models/login-creadentials.model';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Token } from './models/token.model';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() credentials: LoginCredentials): Promise<Token> {
    return this.authService.getToken(credentials);
  }
}
