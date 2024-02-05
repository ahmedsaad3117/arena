import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { CreateRoleDto } from "../dto/create-role.dto";
import { UpdateRoleDto } from "../dto/update-role.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "../entities/role.entity";
import { Equal, EqualOperator, In, Repository } from "typeorm";
import { generateSlugHelper } from "src/_common/utils/genSlug";
import { Public } from "src/_common/decorators/public.decorator";
import { AssignRoleToUser } from "../dto/assign-role.dto";
import { UserToRole } from "src/_manyToMany/userToRole.entity";
import { DisassociateRoleFromUser } from "../dto/disassociate-role.dto";
import { PageOptionsDto } from "src/_common/pagination/pageOption.dto";
import { PageMetaDto } from "src/_common/pagination/page-meta.dto";
import { PageDto } from "src/_common/pagination/page.dto";
import {
  createSuccessAutoTranslated,
  defaultErrorAutoTranslatedString,
  deleteErrorAutoTranslated,
  deleteSuccess,
  deleteSuccessAutoTranslated,
  findOneSuccess,
  findOneSuccessAutoTranslated,
  notFoundErrorAutoTranslatedString,
  updateErrorAutoTranslatedString,
  updateSuccess,
  updateSuccessAutoTranslated,
} from "src/_common/utils/successResponseMessage.util";
import { PermissionsService } from "src/permissions/providers/permissions.service";
import { BulkAssignPermission } from "src/permissions/dto/bulk-assign.dto";
import { BulkAssignRole } from "../dto/bulk-assign.dto";
import { UsersOthersUsersService } from "./role.other.users.service";
import { translateThis } from "src/_common/utils/translate-this";

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(UserToRole)
    private userToRoleRepository: Repository<UserToRole>,
    private usersService: UsersOthersUsersService,
    private permissionsService: PermissionsService
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = new Role();
    Object.assign(role, createRoleDto);

    try {
      const savedRole = await this.roleRepository.save(role);
      const bulkAssignPermissionToRole = new BulkAssignPermission();
      bulkAssignPermissionToRole.permissions = createRoleDto.permissions;
      bulkAssignPermissionToRole.role_id = savedRole.id;
      await this.permissionsService.bulkAssignPermissionToRole(
        bulkAssignPermissionToRole
      );

      return createSuccessAutoTranslated("تم انشاء الدور بنجاح");
    } catch (error) {
      const message = defaultErrorAutoTranslatedString();
      throw new UnprocessableEntityException(message);
    }
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    try {
      const skip = pageOptionsDto.skip;

      const [roles, total] = await this.roleRepository.findAndCount({
        take: pageOptionsDto.take,
        relations: { roleToPermission: { permission: true } },
        skip,
      });
      const rolesWithPermissions = roles.map((role) => ({
        ...role,
        roleToPermission: undefined,
        permissions: role.roleToPermission.map(
          (roleToPermission) => roleToPermission.permission.id
        ),
      }));

      const pageMetaDto = new PageMetaDto({
        itemsPerPage: rolesWithPermissions.length,
        total,
        pageOptionsDto,
      });
      return new PageDto(
        "تم استرجاع الادوار  بنجاح",
        rolesWithPermissions,
        pageMetaDto
      );
    } catch (error) {
      const message = defaultErrorAutoTranslatedString();
      throw new UnprocessableEntityException(message);
    }
  }

  async findOneForController(id: number) {
    const role = await this.findOneByIdOrFail(id);
    return findOneSuccessAutoTranslated(role);
  }
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
    if (!role) {
      const message = notFoundErrorAutoTranslatedString();
      throw new NotFoundException(message);
    }
    return role;
  }
  findOneByQuery(query) {
    return this.findOne(null, query);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    if (id == 1) throw new UnprocessableEntityException();
    const role = await this.findOneByIdOrFail(id);

    Object.assign(role, updateRoleDto);
    try {
      await this.roleRepository.save(role);
      if (id == 1) return updateSuccessAutoTranslated("تم تحديث الدور بنجاح");

      if (updateRoleDto.permissions) {
        const bulkAssignPermissionToRole = new BulkAssignPermission();
        bulkAssignPermissionToRole.permissions = updateRoleDto.permissions;
        bulkAssignPermissionToRole.role_id = role.id;
        await this.permissionsService.bulkAssignPermissionToRole(
          bulkAssignPermissionToRole
        );
      }
      return updateSuccessAutoTranslated("تم تحديث الدور بنجاح");
    } catch (error) {
      const message = updateErrorAutoTranslatedString();
      throw new UnprocessableEntityException(message);
    }
  }
  async remove(id: number) {
    const role = await this.findOneById(id);
    if (!role) {
      const message = notFoundErrorAutoTranslatedString();
      throw new NotFoundException(message);
    }
    try {
      await this.roleRepository.softRemove(role);
      return deleteSuccessAutoTranslated("Role deleted successfully");
    } catch (error) {
      throw new UnprocessableEntityException("Can't delete this role");
    }
  }

  async hardRemove(id: number) {
    const role = await this.findOneById(id);
    if (!role) {
      const message = notFoundErrorAutoTranslatedString();
      throw new NotFoundException(message);
    }
    try {
      await this.roleRepository.remove(role);

      const message = translateThis("default.delete");
      return {
        message: message,
        data: role,
      };
    } catch (error) {
      const message = deleteErrorAutoTranslated();
      throw new UnprocessableEntityException(message);
    }
  }
  async assignRoleToUser(assignRoleToUser: AssignRoleToUser) {
    const { user_id, role_id } = assignRoleToUser;
    const role = await this.findOneById(+role_id);
    const message = notFoundErrorAutoTranslatedString();
    if (!role) throw new NotFoundException(message);

    const user = await this.usersService.findOne(+user_id);

    if (!user) throw new NotFoundException(message);

    const isExistUserToRole = await this.userToRoleRepository.findOne({
      where: { user: { id: user_id }, role: { id: role_id } },
    });

    if (isExistUserToRole) {
      const message = translateThis("permission.user_already_has_this_role");
      throw new UnprocessableEntityException(message);
    }
    try {
      const roleToUser = new UserToRole();
      roleToUser.role = role;
      roleToUser.user = user;
      await this.userToRoleRepository.save(roleToUser);

      const message = translateThis("default.update");
      return {
        message: message,
      };
    } catch (error) {
      const message = defaultErrorAutoTranslatedString();
      throw new UnprocessableEntityException(message);
    }
  }

  async bulkAssignRolesToUser(bulkAssignRole: BulkAssignRole) {
    const { roles: rolesIds, user_id } = bulkAssignRole;
    const user = await this.usersService.findOne(+user_id);
    if (!user) {
      const message = notFoundErrorAutoTranslatedString();
      throw new NotFoundException(message);
    }

    try {
      await this.userToRoleRepository.delete({ user: { id: user_id } });

      // need refactor --------------------------
      const permissions = await this.roleRepository.find({
        where: { id: In(rolesIds) },
      });

      const userToRole: UserToRole[] = permissions.map((role) => {
        const userToRole = new UserToRole();
        userToRole.user = user;
        userToRole.role = role;
        return userToRole;
      });
      // ---------------------------
      await this.userToRoleRepository.save(userToRole);
      const message = translateThis("default.update");

      return {
        message: message,
      };
    } catch (error) {
      const message = defaultErrorAutoTranslatedString();
      throw new UnprocessableEntityException(message);
    }
  }
  async disassociateRoleFromUser(
    disassociateRoleFromUser: DisassociateRoleFromUser
  ) {
    const { user_id, role_id } = disassociateRoleFromUser;
    const isExistUserToRole = await this.userToRoleRepository.findOne({
      where: { user: Equal(user_id), role: Equal(role_id) },
    });
    console.log("isExistUserToRole", isExistUserToRole);

    if (!isExistUserToRole) {
      const message = notFoundErrorAutoTranslatedString();
      throw new NotFoundException(message);
    }

    try {
      await this.userToRoleRepository.remove(isExistUserToRole);

      const message = translateThis("default.update");
      return {
        message: message,
      };
    } catch (error) {
      const message = defaultErrorAutoTranslatedString();
      throw new UnprocessableEntityException(message);
    }
  }
  async countEntities() {
    const count = await this.roleRepository.count();
    return count;
  }
  async findLastRoles(take: number = 5) {
    const last = await this.roleRepository.find({
      order: { created_at: "DESC" },
      take,
    });
    return last;
  }
}
