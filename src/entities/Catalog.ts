import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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