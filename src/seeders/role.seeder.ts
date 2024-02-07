import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
const logger = require('node-color-log');

export default class RoleSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(Role);

    const roles = [
      {
        name_en: 'Super Admin',
        name_ar: 'مشرف عام',
        slug: 'super_admin',
        description: 'Admin that can do any thing',
      },

      {
        name_en: 'Owner',
        name_ar: 'صاحب ملعب',
        slug: 'owner',
        description: 'owner of the playground',
      },
    ];

    await repository.insert(roles);

    /* const admin = await repository.create();
    await repository.save(admin); */
    logger.success('user Seeder is seeded successfully');
  }
}
