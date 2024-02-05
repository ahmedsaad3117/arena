import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { notFoundErrorAutoTranslatedString } from "src/_common/utils/successResponseMessage.util";
import { UserEntity } from "src/user/entities/users.entity";

import { Repository } from "typeorm";

@Injectable()
export class UsersOthersUsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async findOne(id: number = null, query = null) {
    if (!query) query = { id };
    const user = await this.userRepository.findOne({ where: query });
    return user;
  }
  findOneById(id: number) {
    return this.findOne(id);
  }
  async findOneByIdOrFail(id: number) {
    const user = await this.findOne(id);
    const message = notFoundErrorAutoTranslatedString();
    if (!user) throw new NotFoundException(message);
    return user;
  }
}
