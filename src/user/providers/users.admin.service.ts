import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
  forwardRef,
} from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/users.entity";
import { Repository } from "typeorm";
import { UserStatusEnum } from "src/_common/enums/user_status.enum";
import {
  createSuccessAutoTranslated,
  findOneSuccess,
  updateSuccess,
} from "src/_common/utils/successResponseMessage.util";
import { UsersBaseService } from "./users.base.service";
import { FilterUserDto } from "../dto/filter-user.dto";
import { PageOptionsDto } from "src/_common/pagination/pageOption.dto";
import { PageDto } from "src/_common/pagination/page.dto";

@Injectable()
export class UsersAdminService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private userBaseService: UsersBaseService
  ) {}
  async create(createUserDto: CreateUserDto) {
    createUserDto.status = UserStatusEnum.ACTIVE;
    const user = await this.userBaseService.create(createUserDto);
    return createSuccessAutoTranslated(
      "User created and activated successfully"
    );
  }

  async findOnePopulated(id: number) {
    return this.userBaseService.findOnePopulated(id);
  }
  async findAll(
    pageOptionsDto: PageOptionsDto,
    filterUserDto: FilterUserDto
  ): Promise<PageDto<any>> {
    const usersPage = await this.userBaseService.findAll(
      pageOptionsDto,
      filterUserDto
    );
    const users = usersPage.data as Array<UserEntity>;
    // Transform the users to include role IDs
    const usersWithRoles = users.map((user) => ({
      ...user,
      userToRole: undefined,
      roles: user.userToRole.map((userRole) => userRole.role.id),
    }));
    return { ...usersPage, data: usersWithRoles };
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.userBaseService.update(id, updateUserDto);
  }

  async remove(id: number) {
    return this.userBaseService.remove(id);
  }
}
