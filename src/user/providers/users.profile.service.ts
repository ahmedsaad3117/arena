import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersBaseService } from './users.base.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/users.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { findOneSuccessAutoTranslated } from 'src/_common/utils/successResponseMessage.util';

@Injectable()
export class UsersProfileService {
  constructor(
    private userBaseService: UsersBaseService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async findProfile(id: number) {
    const user = await this.userBaseService.findOne(id);
    return findOneSuccessAutoTranslated(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.userBaseService.update(id, updateUserDto);
  }
  // async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
  //   return this.userBaseService.updateUserPassword(id, updatePasswordDto);
  // }
}
