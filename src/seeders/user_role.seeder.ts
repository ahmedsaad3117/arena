import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { DataSource } from "typeorm";
import { UserToRole } from "src/_manyToMany/userToRole.entity";
import { Role } from "src/roles/entities/role.entity";
import { UserEntity } from "src/user/entities/users.entity";
const logger = require("node-color-log");

export default class UserToRoleSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const repository = dataSource.getRepository(UserToRole);
    const userRepository = dataSource.getRepository(UserEntity);
    const roleRepository = dataSource.getRepository(Role);

    const user = await userRepository.findOne({ where: { id: 1 } });
    const role = await roleRepository.findOne({ where: { id: 1 } });
    const user_role = [{ user, role }];

    await repository.insert(user_role);

    /* const admin = await repository.create();
    await repository.save(admin); */
    logger.success("UserToRoleSeeder Seeder is seeded successfully");
  }
}
