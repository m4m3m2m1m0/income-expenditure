import { LoginCredentials } from './models/login-creadentials.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/database/entities/user.entity';
import { ICurrentUser } from './interfaces/current-user.interface';
import { Token } from './models/token.model';
import { UserService } from '../user/user.service';
import { Inject } from '@nestjs/common/decorators';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  async getToken(creadentials: LoginCredentials): Promise<Token> {
    const user = await this.userService.findByNameOrEmail(
      creadentials.userName,
    );

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (!compareSync(creadentials.password, user.password)) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    }

    return this.generateToken(user);
  }

  async refreshToken(token: Token): Promise<Token> {
    const payload = this.verifyToken(token.refreshToken, true);

    const user = await this.userService.findById(payload.id);

    if (user) {
      return this.generateToken(user);
    }

    throw new HttpException('Cannot refresh the token', HttpStatus.CONFLICT);
  }

  generateToken(user: User): Token {
    const tokenPayload: ICurrentUser = {
      id: user.id,
      userName: user.userName,
    };

    const tokenResponse = new Token();
    tokenResponse.token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    tokenResponse.refreshToken = jwt.sign(
      tokenPayload,
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '1w' },
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
