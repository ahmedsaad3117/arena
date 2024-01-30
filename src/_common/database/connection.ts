import { DataSource } from 'typeorm';
import ormconfig from '../config/ormconfig';

export class DBConnection {
  private connection: DataSource;

  constructor() {}

  public async connect() {
    return this.connection || (await this.getConnection());
  }

  private async getConnection() {
    this.connection = await new DataSource(ormconfig).initialize();
    return this.connection;
  }
}
