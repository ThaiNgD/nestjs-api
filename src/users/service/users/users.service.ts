import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/typeorm/entity/User';
import { CreatedUserType } from 'src/utils/type';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async fetchUser(sortDesc: boolean): Promise<User[]> {
    return this.userRepository.find({
      order: { userId: sortDesc ? 'ASC' : 'DESC' },
      // relations: ['userId'],
    });
  }
  async createUser(user: CreatedUserType): Promise<boolean> {
    const isSuccess = await this.userRepository.insert(user);
    if (isSuccess) {
      return true;
    } else {
      return false;
    }
  }

  async findUserByUsername(userId: string): Promise<User[] | undefined> {
    return this.userRepository.find({
      where: { userId },
    });
  }
}
