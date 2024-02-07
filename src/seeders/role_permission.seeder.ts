import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { DataSource } from "typeorm";
import { Role } from "src/roles/entities/role.entity";
import { RoleToPermission } from "src/_manyToMany/roleToPermission.entity";
import { Permission } from "src/permissions/entities/permission.entity";
const logger = require("node-color-log");

export default class RoleToPermissionSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const repository = dataSource.getRepository(RoleToPermission);
    const permissionRepository = dataSource.getRepository(Permission);
    const roleRepository = dataSource.getRepository(Role);

    const permissions = await permissionRepository.find();
    const role = await roleRepository.findOne({ where: { id: 1 } });
    let role_permission = [];

    permissions.forEach((permission: Permission) => {
      role_permission.push({ permission, role });
    });

    await repository.insert(role_permission);

    /* const admin = await repository.create();
    await repository.save(admin); */
    logger.success("RoleToSeeder Seeder is seeded successfully");
  }
}
