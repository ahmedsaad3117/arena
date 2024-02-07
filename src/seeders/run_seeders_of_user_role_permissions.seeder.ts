import UserSeeder from './user.seeder';
import { runSeeders } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import RoleSeeder from './role.seeder';
import UserToRoleSeeder from './user_role.seeder';
import RoleToPermissionSeeder from './role_permission.seeder';
import ormconfig from 'src/_common/config/ormconfig';
import PermissionSeeder from './permissions seeder';

const logger = require('node-color-log');

const run = async () => {
  ormconfig.entities = [__dirname + '/../**/*.entity.{js,ts}'];
  ormconfig.synchronize = false;
  const dataSource = new DataSource(ormconfig);
  await dataSource.initialize();

  await dataSource.query('DELETE FROM user_role;');
  await dataSource.query('ALTER TABLE user_role AUTO_INCREMENT = 1;');
  await dataSource.query('DELETE FROM role_permission;');
  await dataSource.query('ALTER TABLE role_permission AUTO_INCREMENT = 1;');
  await dataSource.query('DELETE FROM users;');
  await dataSource.query('ALTER TABLE users AUTO_INCREMENT = 1;');
  await dataSource.query('DELETE FROM roles;');
  await dataSource.query('ALTER TABLE roles AUTO_INCREMENT = 1;');
  await dataSource.query('DELETE FROM permissions;');
  await dataSource.query('ALTER TABLE permissions AUTO_INCREMENT = 1;');

  await runSeeders(dataSource, {
    seeds: [
      UserSeeder,
      RoleSeeder,
      PermissionSeeder,
      UserToRoleSeeder,
      RoleToPermissionSeeder,
    ],
  });
};

run()
  .then(() => logger.success('seeded successfully'))
  .catch((error) => logger.error(error))
  .then(() => process.exit());
