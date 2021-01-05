import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';
import { compareSync, genSalt, genSaltSync, hash, hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async addUser(user: User): Promise<void> {
    const userCount = await this.usersRepository.count({
      where: [{ userName: user.userName }, { email: user.email }],
    });

    if (userCount) {
      throw new HttpException(
        'User with the same email or user name already exists',
        HttpStatus.CONFLICT,
      );
    }

    var hashedPassword = hashSync(user.password, 10);
    user.password = hashedPassword;

    await this.usersRepository.save(user);
  }

  async findById(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findByNameOrEmail(userNameOrEmail: string): Promise<User> {
    return this.usersRepository.findOne({
      where: [{ userName: userNameOrEmail }, { email: userNameOrEmail }],
    });
  }
}
