import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

export type ConnectionOptions = PostgresConnectionOptions &
  TypeOrmModuleOptions & { seeds: string[] };

const entitiesPath = path.resolve(__dirname, '../**/*.entity.[tj]s');
const migrationsPath = path.resolve(__dirname, '../migration/**/*.[tj]s');
const seedsPath = path.resolve(__dirname, '../seeds/**/*.[tj]s');

export const customerDBConfig = (migrate = false): ConnectionOptions => ({
  type: 'postgres',
  name: 'customer',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  migrationsRun: migrate,
  logging: process.env.NODE_ENV === 'development' ? true : migrate,
  entities: [entitiesPath],
  migrations: [migrationsPath],
  seeds: [seedsPath],
  ssl: false,
  extra: {},
  keepConnectionAlive: true,
});
export const config = customerDBConfig();
export const configMigrate = customerDBConfig(true);
