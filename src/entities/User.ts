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

@Entity('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    @ManyToOne(() => Person, person => person.id)
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