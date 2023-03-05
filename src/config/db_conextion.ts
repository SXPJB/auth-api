import {DataSource} from "typeorm";
import {DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER} from "../constants/constants";
import {Person} from "../entities/Person";
import {Catalog} from "../entities/Catalog";
import {User} from "../entities/User";

export const DatabaseConfig = new DataSource({
    type: 'mysql',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: false,
    logging: true,
    entities: [Catalog, Person, User],
    subscribers: [],
    migrations: [],
})