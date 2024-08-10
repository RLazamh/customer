import { Injectable } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';

@Injectable()
export class DatabaseService {
  private dataSource: DataSource;

  async init(config: DataSourceOptions) {
    this.dataSource = new DataSource(config);
    await this.dataSource.initialize();
    await this.dataSource.runMigrations();
    return this.dataSource;
  }
}
