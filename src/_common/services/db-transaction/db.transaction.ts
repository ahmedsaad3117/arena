import { Injectable } from "@nestjs/common";
import { log } from "console";
import { BaseEntity, DataSource, ObjectLiteral, QueryRunner } from "typeorm";

@Injectable()
export class CreateDBTransaction {
  constructor(private dataSource: DataSource) {}

  async transactioSaveHandller(...args: ObjectLiteral[]) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const arg of args) {
        await this.queryRunnerHandller(queryRunner, arg.constructor.name, arg);
      }
      await queryRunner.commitTransaction();

      log("Sucess database transaction");
    } catch (e) {
      log("Failed database transaction");
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      log("End database transaction");
      await queryRunner.release();
    }
  }

  async queryRunnerHandller(queryRunnerInstance: QueryRunner, model, data) {
    await queryRunnerInstance.manager.save(model, data);
  }
}
