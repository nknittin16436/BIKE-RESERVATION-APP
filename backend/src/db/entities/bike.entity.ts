import { Entity, PrimaryGeneratedColumn, Column, BaseEntity,OneToMany } from "typeorm"
import { Reservation } from "./reservation.entity"
@Entity()
export class Bike extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    color: string

    @Column()
    location: string

    @Column({nullable:true,default:0})
    averageRating: number

    @OneToMany(() => Reservation, (reservation) => reservation.bike,{ nullable: true })
    reservations: Reservation[]
}