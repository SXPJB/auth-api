import { DataSource } from 'typeorm';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from '../constants/constants';
import { Person } from '../entities/Person';
import { Catalog } from '../entities/Catalog';
import { User } from '../entities/User';

export const DatabaseConfig = new DataSource({
  database: DB_NAME,
  entities: [Catalog, Person, User],
  host: DB_HOST,
  logging: true,
  migrations: [],
  password: DB_PASSWORD,
  port: DB_PORT,
  subscribers: [],
  synchronize: false,
  type: 'mysql',
  username: DB_USER,
});
