import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { notFoundErrorAutoTranslatedString } from "src/_common/utils/successResponseMessage.util";
import { Role } from "src/roles/entities/role.entity";
import { Repository } from "typeorm";

@Injectable()
export class PermissionsOthersRolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) {}

  async findOne(id: number = null, query = null) {
    if (!query) query = { id };
    const role = await this.roleRepository.findOne({ where: query });
    return role;
  }
  findOneById(id: number) {
    return this.findOne(id);
  }
  async findOneByIdOrFail(id: number) {
    const role = await this.findOne(id);
    if (!role) throw new NotFoundException(notFoundErrorAutoTranslatedString());
    return role;
  }
}
