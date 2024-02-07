import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { DataSource } from "typeorm";
import { Permission } from "../permissions/entities/permission.entity";
const logger = require("node-color-log");

export default class PermissionSeeder implements Seeder {
  getPermissions() {
    const categories = [
      "dashboard",
      "users",
      "roles",
      "permissions",
      "currencies",
      "rates",
      "exchange_requests",
      "wallet",
      "transactions",
    ];

    const actions = ["find", "findOne", "create", "update", "delete"];

    const exceptions = {
      /*     transactions: {
        unused_actions: ['find', 'findOne'],
        extra_actions: [],
      }, */
      dashboard: {
        unused_actions: ["create", "update", "delete"],
        extra_actions: [],
      },
      permissions: {
        unused_actions: ["create", "update", "delete"],
        extra_actions: [],
      },
      transactions: {
        unused_actions: ["create", "update", "delete"],
        extra_actions: [],
      },
    };

    let permissions = [];

    for (const category of categories) {
      const unusedActions = exceptions[category]
        ? exceptions[category]["unused_actions"]
        : [];
      const extraActions = exceptions[category]
        ? exceptions[category]["extra_actions"]
        : [];

      let usedActions = actions.filter(
        (action) => !unusedActions.includes(action)
      );
      usedActions = [...usedActions, ...extraActions];

      for (const action of usedActions) {
        permissions.push({
          name: action + " " + category,
          slug: category.replace(" ", "_") + ":" + action,
          category: category,
          action: action,
        });
      }
    }

    return permissions;
  }
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    let permissions = this.getPermissions();
    const repository = dataSource.getRepository(Permission);
    await repository.insert(permissions);
    logger.success("Permission Seeder is seeded successfully");
  }
}
