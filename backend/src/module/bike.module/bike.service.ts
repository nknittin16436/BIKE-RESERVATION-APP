import { Injectable, UnauthorizedException, HttpException } from '@nestjs/common';
import { Bike } from 'src/db/entities/bike.entity';
import { User } from 'src/db/entities/user.entity';
import { Between } from 'typeorm';
@Injectable()
export class BikeService {

    async getAllBikes(query): Promise<any> {
        console.log(query);
        try {
            let bikes = await Bike.find({
                relations: {
                    reservations: true,
                }
                , where: {
                    averageRating: Between(parseInt(query.rating), 5)
                }
            });
            bikes = bikes.filter(bike => bike.name.toLowerCase().includes(query.name.toLowerCase()));
            bikes = bikes.filter(bike => bike.color.toLowerCase().includes(query.color.toLowerCase()));
            bikes = bikes.filter(bike => bike.location.toLowerCase().includes(query.location.toLowerCase()));
            bikes = bikes.filter((bike) => {
                let reservations = bike.reservations;
                reservations=reservations.filter(reservation=>reservation.status===true)
                if(reservations.length===0){
                    return true;
                }
                for (const reservation of reservations){
                    if(query.fromDate<reservation.fromDate && query.toDate< reservation.fromDate){
                        return true;
                    }

                    if(query.fromDate>reservation.fromDate && query.fromDate>reservation.toDate){
                        return true;
                    }
                }
            });

            console.log(bikes);
            // const filterdBikes = await Bike.createQueryBuilder("bike")
            //     .where(`bike.name like :name`, { name: `${bikeName}` })
            //     .andWhere(`bike.color like :color`, { color: `${bikeColor}` })
            //     .andWhere(`bike.location like :location`, { location: `${bikeLocation}` })
            //     .getMany()
            // console.log(filterdBikes);
            return { bikes, success: true }
        } catch (error) {
            throw new Error(error);
        }
    }

    async createBike({ name, color, location }): Promise<any> {
        try {
            const bike = new Bike();
            bike.name = name;
            bike.color = color;
            bike.location = location;
            await bike.save();
            console.log(bike);
            return { success: true, statusCode: 201 };
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }

    // async getUser(token: string): Promise<any> {
    //     try {
    //         var decoded = jwt.verify(token, 'restaurantBackend');
    //         const userId = decoded.id;
    //         const user = await User.findOne({ where: { id: userId } });
    //         if (user) {
    //             delete user.password;
    //             return { user, success: true, statusCode: 200 }
    //         }
    //         throw new HttpException('User does not exist', 400);
    //     } catch (error) {
    //         throw new HttpException('User does not exist', 400);
    //     }
    // }





    async updateBike({ id, name, color, location }): Promise<any> {
        try {
            const bike = await Bike.findOne({ where: { id: id } });
            if (bike) {
                await Bike.update(id, { name, color, location });
                return { success: true, statusCode: 200 }
            }
            else throw new HttpException('Unable to update user', 400);
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }

    async deleteBike(id: string): Promise<any> {
        try {
            const bike = await Bike.findOne({ where: { id: id } });
            console.log(bike)
            if (bike) {
                await Bike.delete(id);
                return { success: true, statusCode: 200 }
            }
            else throw new HttpException('Unable to delete Bike', 400);
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }

}