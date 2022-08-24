import { Entity, PrimaryGeneratedColumn, Column, BaseEntity,OneToMany ,JoinTable} from "typeorm"
import { Reservation } from "./reservation.entity"
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column({nullable:false,unique:true})
    email: string

    @Column({nullable:true,default:"regular"})
    role: string

    @Column()
    password: string

    @OneToMany(() => Reservation, (reservation) => reservation.user)
    reservations: Reservation[]

   

}