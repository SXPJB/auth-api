import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Person} from "./Person";


/**
 * This class represents the user entity of the application, and it's used to map the user table in the database
 * @class User
 * @extends BaseEntity
 * @property {number} id - The id of the user
 * @property {Person} person - The person of the user
 * @property {string} username - The username of the user
 * @property {string} password - The password of the user
 * @property {string} token - The token of the user
 * @property {boolean} isConfirmed - The isConfirmed of the user
 * @property {string} confirmationCode - The confirmationCode of the user
 * @property {Date} confirmationCodeExpires - The confirmationCodeExpires of the user
 * @property {boolean} active - The active of the user
 * @property {Date} createdAt - The createdAt of the user
 * @property {Date} updatedAt - The updatedAt of the user
 * **/
@Entity('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    @ManyToOne(() => Person, person => person.id, {eager: true})
    @JoinColumn({referencedColumnName: "id", name: "id_person"})
    person: Person
    @Column()
    username: string
    @Column()
    password: string
    @Column()
    token: string
    @Column({name: 'is_confirmed'})
    isConfirmed: boolean
    @Column({name: 'confirmation_code'})
    confirmationCode: string
    @Column({name: 'confirmation_code_expires'})
    confirmationCodeExpires: Date
    @Column()
    active: boolean
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date
}