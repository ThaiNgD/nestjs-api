import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async updateUserById(userId: string, updateData: User): Promise<any> {
    const isUser = await this.userRepository.findOne({
      where: { userId: userId },
    });
    if (isUser) {
      const isSuccess = await this.userRepository.update(
        { userId },
        updateData,
      );
      if (isSuccess) {
        throw new HttpException('Update user succesfully', HttpStatus.OK);
      } else {
        throw new HttpException('Cant update data', HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException('Cant find user', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUserById(userId: string): Promise<any> {
    const isUser = await this.userRepository.findOne({
      where: { userId: userId },
    });
    if (isUser) {
      const isSuccess = await this.userRepository.delete({ userId });
      if (isSuccess.affected > 0) {
        throw new HttpException('Delete user succesfully', HttpStatus.OK);
      } else {
        throw new HttpException('Cant delete user', HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException('Cant find user', HttpStatus.BAD_REQUEST);
    }
  }
}
