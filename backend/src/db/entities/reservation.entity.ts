import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm"
import { User } from "./user.entity"

@Entity()
export class Reservation extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column()
    status: boolean

    @Column()
    bikeName: string

    @Column({nullable:true})
    rating: number

    @Column()
    isRated: boolean

    @Column()
    fromDate: string

    @Column()
    toDate: string

    @ManyToOne(() => User, (user) => user.reservations,{ nullable: true })
    user: User
}