import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity ,JoinTable} from "typeorm"
import { Bike } from "./bike.entity"
import { User } from "./user.entity"

@Entity()
export class Reservation extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ nullable: true, default: true })
    status: boolean

    @Column()
    bikeName: string

    @Column()
    bikeId: string

    @Column({ nullable: true, default: 0 })
    rating: number

    @Column({ nullable: true, default: false })
    isRated: boolean

    @Column()
    fromDate: string

    @Column()
    toDate: string

    @Column()
    userId: string
    @Column({ nullable: true })
    userName: string

    @ManyToOne(() => User, (user) => user.reservations, { nullable: true, cascade:true })
    user: User

    @ManyToOne(() => Bike, (bike) => bike.reservations, { nullable: true, onDelete: 'CASCADE' })
    bike: Bike

    @JoinTable()
    users: User[]
}