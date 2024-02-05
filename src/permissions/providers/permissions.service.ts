import { Role } from "src/roles/entities/role.entity";
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Equal, In, Repository } from "typeorm";
import { Permission } from "../entities/permission.entity";
import { RoleToPermission } from "src/_manyToMany/roleToPermission.entity";
import { RolesService } from "src/roles/providers/roles.service";
import { AssignPermissionToRole } from "../dto/assign-permission.dto";
import { DisassociateRoleFromUser } from "src/roles/dto/disassociate-role.dto";
import { DisassociatePermissionFromRole } from "../dto/disassociate-permission.dto";
import { BulkAssignPermission } from "../dto/bulk-assign.dto";
import { PermissionsOthersRolesService } from "./permissions.other.roles.service";
import { translateThis } from "src/_common/utils/translate-this";
import {
  defaultErrorAutoTranslatedString,
  notFoundErrorAutoTranslatedString,
} from "src/_common/utils/successResponseMessage.util";

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(RoleToPermission)
    private roleToPermissionRepo: Repository<RoleToPermission>,
    private roleService: PermissionsOthersRolesService
  ) {}

  async findOne(id: number = null, query = null) {
    if (!query) query = { id };
    const role = await this.permissionRepository.findOne({ where: query });
    return role;
  }
  findOneById(id: number) {
    return this.findOne(id);
  }
  findOneByQuery(query) {
    return this.findOne(null, query);
  }
  async findAll() {
    try {
      const permissions = await this.permissionRepository.find();
      const message = translateThis("default.find");

      return {
        message: message,
        data: permissions,
      };
    } catch (error) {}
  }

  async assignPermissionToRole(assignPermissionToRole: AssignPermissionToRole) {
    const { permission_id, role_id } = assignPermissionToRole;

    const permission = await this.findOneById(permission_id);
    if (!permission)
      throw new NotFoundException(notFoundErrorAutoTranslatedString());

    const role = await this.roleService.findOne(role_id);
    if (!role) throw new NotFoundException(notFoundErrorAutoTranslatedString());

    const isExistPermissionToRole = await this.roleToPermissionRepo.findOne({
      where: { permission: Equal(permission_id), role: Equal(role_id) },
    });
    console.log("isExistPermissionToRole", isExistPermissionToRole);

    if (isExistPermissionToRole) {
      const message = translateThis(
        "permission.role_already_has_this_permission"
      );
      throw new UnprocessableEntityException(message);
    }

    try {
      const roleToPermission = new RoleToPermission();
      roleToPermission.role = role;
      roleToPermission.permission = permission;
      await this.roleToPermissionRepo.save(roleToPermission);

      const message = translateThis("default.update");

      return {
        message: message,
      };
    } catch (error) {
      const message = defaultErrorAutoTranslatedString();
      throw new UnprocessableEntityException(message);
    }
  }
  async bulkAssignPermissionToRole(bulkAssignPermission: BulkAssignPermission) {
    const { permissions: permissionIds, role_id } = bulkAssignPermission;
    const role = await this.roleService.findOne(role_id);
    if (!role) throw new NotFoundException(notFoundErrorAutoTranslatedString());

    try {
      await this.roleToPermissionRepo.delete({ role: { id: role_id } });

      // need refactor --------------------------
      const permissions = await this.permissionRepository.find({
        where: { id: In(permissionIds) },
      });

      const rolePermissions: RoleToPermission[] = permissions.map(
        (permission) => {
          const roleToPermission = new RoleToPermission();
          roleToPermission.role = role;
          roleToPermission.permission = permission;
          return roleToPermission;
        }
      );
      // ---------------------------
      await this.roleToPermissionRepo.save(rolePermissions);
      const message = translateThis("default.update");

      return {
        message: message,
      };
    } catch (error) {
      const message = defaultErrorAutoTranslatedString();
      throw new UnprocessableEntityException(message);
    }
  }

  async disassociatePermissionFromRole(
    disassociateRoleFromUser: DisassociatePermissionFromRole
  ) {
    const { permission_id, role_id } = disassociateRoleFromUser;
    const isExistPermissionToRole = await this.roleToPermissionRepo.findOne({
      where: { permission: Equal(permission_id), role: Equal(role_id) },
    });
    console.log("isExistPermissionToRole", isExistPermissionToRole);

    if (!isExistPermissionToRole) {
      const message = translateThis("permission.permission_not_in_role");
      throw new NotFoundException(message);
    }

    try {
      await this.roleToPermissionRepo.remove(isExistPermissionToRole);
      const message = translateThis("default.update");

      return {
        message: message,
      };
    } catch (error) {
      const message = defaultErrorAutoTranslatedString();
      throw new UnprocessableEntityException(message);
    }
  }
}

/*

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { Role } from './role.entity';
import { Permission } from './permission.entity';
import { RolePermission } from './role-permission.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(RolePermission)
    private rolePermissionRepository: Repository<RolePermission>,
  ) {}

  async updateRolePermissions(roleId: number, permissionIds: number[]): Promise<void> {
    const role = await this.roleRepository.findOne(roleId);
    if (!role) {
      throw new Error('Role not found');
    }

    // Start a transaction to ensure data consistency
    await getConnection().transaction(async transactionalEntityManager => {
      // Delete existing role permissions
      await transactionalEntityManager.delete(RolePermission, { role });

      // Fetch the selected permissions
      const permissions = await this.permissionRepository.findByIds(permissionIds);

      // Create new RolePermission entities for the selected permissions
      const rolePermissions = permissions.map(permission => {
        const rolePermission = new RolePermission();
        rolePermission.role = role;
        rolePermission.permission = permission;
        return rolePermission;
      });

      // Insert the new RolePermission entities
      await transactionalEntityManager.save(RolePermission, rolePermissions);
    });
  }
}


*/
