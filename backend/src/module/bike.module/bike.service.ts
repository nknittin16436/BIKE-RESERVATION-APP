import { Injectable, UnauthorizedException, HttpException } from '@nestjs/common';
import { Bike } from 'src/db/entities/bike.entity';
import { User } from 'src/db/entities/user.entity';
import { Like } from 'typeorm';
@Injectable()
export class BikeService {

    async getAllBikes(): Promise<any> {
        try {
            const bikes = await Bike.find({
                relations: {
                    reservations: true,
                }
            });
            const bikeName = "Apache Rtr";
            const bikeColor = "White";
            const bikeLocation = "Gurgaon";
            // const filterdBikes = await Bike.find({
            //     where: [{
            //         name: Like(`${bikeName}`),
            //     }, {
            //         color: Like(`${bikeColor}`),
            //     }]
            // });


            const filterdBikes = await Bike.createQueryBuilder("bike")
                .where(`bike.name like :name`, { name: `${bikeName}` })
                .andWhere(`bike.color like :color`, { color: `${bikeColor}` })
                .andWhere(`bike.location like :location`, { location: `${bikeLocation}` })
                .getMany()
            console.log(filterdBikes);
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





    async updateUser(id: string, name: string, email: string, role: string): Promise<any> {
        try {
            const user = await User.findOne({ where: { id: id } });
            if (user) {
                await User.update(id, { name, email, role });
                return { success: true, statusCode: 200 }
            }
            else throw new HttpException('Unable to update user', 400);
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }

    async deleteUser(id: string): Promise<any> {
        try {
            const user = await User.findOne({ where: { id: id } });
            if (user) {
                await User.delete(id);
                return { success: true, statusCode: 200 }
            }
            else throw new HttpException('Unable to delete user', 400);
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }

}