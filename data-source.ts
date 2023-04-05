import 'reflect-metadata';
import { join } from 'path';

import { DataSource, DataSourceOptions } from 'typeorm';

const root = !!process.env.DEV ? 'src' : 'dist';

const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'qwerty123456',
  database: process.env.DB_NAME ?? 'guess',
  synchronize: false,
  logging: false,
  entities: [join(root, '**', '*.entity{.ts,.js}')],
  migrationsTableName: '_migrations',
  migrations: [join(root, '**', 'migrations', '*{.ts,.js}')],
  migrationsRun: true,
  migrationsTransactionMode: 'each',
};

const AppDataSource = new DataSource(options);

export default AppDataSource;
