import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();
export const dataSourceOptions: DataSourceOptions = {
  // @ts-ignore
  type: process.env.DB_DRIVER,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: false,
  entities: [resolve(__dirname, '../**/entities/*.entity.{ts,js}')],
  migrations: [resolve(__dirname, '../database/**/migrations/*.ts')],
  synchronize: false,
  migrationsRun: true,
};

export const AppDataSource: DataSource = new DataSource(dataSourceOptions);
