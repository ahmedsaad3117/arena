import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { DataSource } from "typeorm";
import { UserEntity } from "src/user/entities/users.entity";
import { UserStatusEnum } from "src/_common/enums/user_status.enum";
const logger = require("node-color-log");

export default class AdminSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const repository = dataSource.getRepository(UserEntity);
    const users = [
      {
        name: "Super Admin",
        email: "super@xchange.com",
        phone: "0123456789",
        password:
          "$2a$10$.aOSZ3eGMXw983IPUoNUL.TBcI9PYwr39HXsMN78pWn.dkGFFC0pW", //12345678

        status: UserStatusEnum.ACTIVE,
      },
      {
        name: "emp",
        email: "emp@xchange.com",
        phone: "01111111111",
        password:
          "$2a$10$.aOSZ3eGMXw983IPUoNUL.TBcI9PYwr39HXsMN78pWn.dkGFFC0pW", //12345678

        status: UserStatusEnum.ACTIVE,
      },
      {
        name: "Employee",
        email: "employee@xchange.com",
        phone: "02222222222",
        password:
          "$2a$10$.aOSZ3eGMXw983IPUoNUL.TBcI9PYwr39HXsMN78pWn.dkGFFC0pW", //12345678

        status: UserStatusEnum.ACTIVE,
      },
    ];

    await repository.insert(users);

    /* const admin = await repository.create();
    await repository.save(admin); */
    logger.success("user Seeder is seeded successfully");
  }
}
