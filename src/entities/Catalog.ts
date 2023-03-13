import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

/**
 * This class represents a Catalog entity in the database, and it's used for all types of catalogs in the system.
 * @class Catalog
 * @extends BaseEntity
 * @property {number} id - The id of the catalog.
 * @property {string} catalog - The catalog of the catalog.
 * @property {string} code - The code of the catalog.
 * @property {string} description - The description of the catalog.
 */
@Entity("catalog")
export class Catalog extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    catalog: string
    @Column()
    code: string
    @Column()
    description: string
}