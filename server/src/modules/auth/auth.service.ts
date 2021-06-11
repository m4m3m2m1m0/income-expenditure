import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/database/entities/user.entity';
import { ICurrentUser } from './interfaces/current-user.interface';
import { Token } from './models/token.model';
import { UserService } from '../user/user.service';
import { Inject } from '@nestjs/common/decorators';
import { compare } from 'bcrypt';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { IPayload } from './interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  private readonly tokenOptions: JwtSignOptions = {
    secret: process.env.JWT_SECRET,
    expiresIn: '5s',
  };

  private readonly refreshTokenOptions: JwtSignOptions = {
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: '1d',
  };

  async validateUser(userName: string, password: string): Promise<User> {
    const user = await this.userService.findByNameOrEmail(userName);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await compare(password, user.password))) {
      throw new ForbiddenException('Wrong password');
    }

    return user;
  }

  async refreshToken(token: Token): Promise<Token> {
    try {
      const payload: IPayload = await this.jwtService.verifyAsync(
        token.refreshToken,
        this.refreshTokenOptions,
      );

      const user = await this.userService.findById(payload.sub);

      if (user) {
        return this.generateToken(user);
      }
    } catch (e) {
      throw new ConflictException('Cannot refresh the token');
    }
  }

  generateToken(user: User): Token {
    const tokenPayload: IPayload = {
      sub: user.id,
      userName: user.userName,
    };

    const tokenResponse = new Token();

    tokenResponse.token = this.jwtService.sign(tokenPayload, this.tokenOptions);
    tokenResponse.refreshToken = this.jwtService.sign(
      tokenPayload,
      this.refreshTokenOptions,
    );

    return tokenResponse;
  }

  verifyToken(token: string, refresh: boolean = false): ICurrentUser {
    if (refresh) {
      return this.checkToken(token, process.env.JWT_REFRESH_SECRET);
    }
    return this.checkToken(token, process.env.JWT_SECRET);
  }

  private checkToken(token: string, secret: string): ICurrentUser {
    const currentUser: ICurrentUser = jwt.verify(token, secret) as ICurrentUser;

    return currentUser;
  }
}
