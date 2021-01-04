import { LoginCredentials } from './models/login-creadentials.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/database/entities/user.entity';
import { ICurrentUser } from './interfaces/current-user.interface';
import { Token } from './models/token.model';
import { UserService } from '../user/user.service';
import { Inject } from '@nestjs/common/decorators';
import bcrypt, { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  async getToken(creadentials: LoginCredentials): Promise<Token> {
    const user = await this.userService.findByName(creadentials.userName);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (!compareSync(creadentials.password, user.password)) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    }

    return this.generateToken(user);
  }

  // async refreshToken(token: string): Promise<Token | ErrorResponse> {
  //   const userToken = this.checkToken(token, process.env.JWT_REFRESH_SECRET);
  //   if (!userToken) {
  //     return new ErrorResponse('Invalid token.');
  //   }

  //   const user = await this.usersService.findById(userToken._id);
  //   if (!user) {
  //     return new ErrorResponse('User has no access.');
  //   }

  //   return this.generateToken(user);
  // }

  generateToken(user: User): Token {
    const tokenPayload: ICurrentUser = {
      id: user.id,
      userName: user.userName,
    };

    const tokenResponse = new Token();
    tokenResponse.token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
    tokenResponse.refreshToken = jwt.sign(
      tokenPayload,
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '1w' },
    );

    return tokenResponse;
  }

  verifyToken(token: string): ICurrentUser {
    return this.checkToken(token, process.env.JWT_SECRET);
  }

  private checkToken(token: string, secret: string): ICurrentUser {
    const currentUser: ICurrentUser = jwt.verify(token, secret) as ICurrentUser;

    return currentUser;
  }
}