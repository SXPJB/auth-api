import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Catalog } from './Catalog';

/**
 * This class represents a Person entity in the database, and it's used to create the table in the database.
 * @class Person
 * @extends BaseEntity
 * @property {number} id - The id of the person.
 * @property {string} firstName - The first name of the person.
 * @property {string} lastName - The last name of the person.
 * @property {string} email - The email of the person.
 * @property {Catalog} gender - It is a Gender Catalog of the person.
 * @property {string} active - The active of the person.
 * @property {Date} createdAt - The createdAt of the person.
 * @property {Date} updatedAt - The updatedAt of the person.
 * **/
@Entity('person')
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'first_name' })
  firstName: string;
  @Column({ name: 'last_name' })
  lastName: string;
  @Column()
  email: string;
  @ManyToOne(() => Catalog, (catalog) => catalog.id, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'id_gender' })
  gender: Catalog;
  @Column()
  active: boolean;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
