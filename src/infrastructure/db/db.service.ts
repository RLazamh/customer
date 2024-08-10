import { Injectable } from '@nestjs/common';
import { DataSource, DataSourceOptions, Repository } from 'typeorm';

@Injectable()
export class DatabaseService {
  private dataSource: DataSource;

  async init(config: DataSourceOptions) {
    if (!this.dataSource) {
      this.dataSource = new DataSource(config);
      await this.dataSource.initialize();
      await this.dataSource.runMigrations();
      return this.dataSource;
    }
  }

  /**
   * Retrieves the repository for a given entity.
   * @param entity The entity class to retrieve the repository for.
   * @returns The repository for the specified entity.
   */
  getRepository<T>(entity: new () => T): Repository<T> {
    if (!this.dataSource) {
      throw new Error('DataSource is not initialized. Call init() first.');
    }
    return this.dataSource.getRepository(entity);
  }
}
