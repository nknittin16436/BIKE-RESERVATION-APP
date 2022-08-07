import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm"
import { Bike } from "./bike.entity"
import { User } from "./user.entity"

@Entity()
export class Reservation extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column({nullable:true,default:true})
    status: boolean

    @Column()
    bikeName: string

    @Column()
    bikeId: string

    @Column({nullable:true,default:0})
    rating: number

    @Column({nullable:true,default:false})
    isRated: boolean

    @Column()
    fromDate: string

    @Column()
    toDate: string
     
    @Column()
    userId:string

    @ManyToOne(() => User, (user) => user.reservations,{ nullable: true })
    user: User

    @ManyToOne(() => Bike, (bike) => bike.reservations,{ nullable: true })
    bike: Bike
}