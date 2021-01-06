import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Token } from './models/token.model';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Req() req): Promise<Token> {
    return this.authService.generateToken(req.user);
  }

  @Post('refreshToken')
  @UseInterceptors(ClassSerializerInterceptor)
  async refreshToken(@Body() token: Token): Promise<Token> {
    return this.authService.refreshToken(token);
  }
}
