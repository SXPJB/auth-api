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
import {Catalog} from "./Catalog";

@Entity('person')
export class Person extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column({name: 'first_name'})
    firstName: string
    @Column({name: 'last_name'})
    lastName: string
    @Column()
    email: string
    @ManyToOne(() => Catalog, catalog => catalog.id, {cascade: true})
    @JoinColumn({referencedColumnName: "id", name: "id_gender"})
    gender: Catalog
    @Column()
    active: string
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date
}