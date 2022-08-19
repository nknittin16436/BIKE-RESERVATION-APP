import { Injectable, UnauthorizedException, HttpException } from '@nestjs/common';
import { Bike } from 'src/db/entities/bike.entity';
import { User } from 'src/db/entities/user.entity';
import { AddBikeSchema } from 'src/JoiSchema/joiSchema';
import { Between } from 'typeorm';
@Injectable()
export class BikeService {

    async getAllBikes(query): Promise<any> {
        try {
            let bikes = await Bike.find({
                relations: {
                    reservations: true,
                }
            });
            const totalBikes = bikes.length;
            if (query.page && query.pageSize) {
                bikes = bikes.slice((query.page - 1) * query.pageSize, query.page * query.pageSize);
            }

            console.log(bikes);
            return { bikes, totalBikes, success: true }
        } catch (error) {
            throw new HttpException(error, error.status);

        }
    }

    async getAllFilteredBikes(query): Promise<any> {
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
            if (query.name) {
                bikes = bikes.filter(bike => bike.name.toLowerCase().includes(query.name.toLowerCase()));
            }
            if (query.color) {

                bikes = bikes.filter(bike => bike.color.toLowerCase().includes(query.color.toLowerCase()));
            }
            if (query.location) {

                bikes = bikes.filter(bike => bike.location.toLowerCase().includes(query.location.toLowerCase()));
            }
            if (query.fromDate && query.toDate) {
                bikes = bikes.filter((bike) => {
                    let reservations = bike.reservations;
                    reservations = reservations.filter(reservation => reservation.status === true)
                    if (reservations.length === 0) {
                        return true;
                    }
                    for (const reservation of reservations) {
                        if (query.fromDate < reservation.fromDate && query.toDate < reservation.fromDate) {
                            return true;
                        }

                        if (query.fromDate > reservation.fromDate && query.fromDate > reservation.toDate) {
                            return true;
                        }
                    }
                });
            }
            const totalBikes = bikes.length;
            if (query.page && query.pageSize) {
                bikes = bikes.slice((query.page - 1) * query.pageSize, query.page * query.pageSize);
            }

            console.log(bikes);
            // const filterdBikes = await Bike.createQueryBuilder("bike")
            //     .where(`bike.name like :name`, { name: `${bikeName}` })
            //     .andWhere(`bike.color like :color`, { color: `${bikeColor}` })
            //     .andWhere(`bike.location like :location`, { location: `${bikeLocation}` })
            //     .getMany()
            // console.log(filterdBikes);
            return { bikes, totalBikes, success: true }
        } catch (error) {
            throw new HttpException(error, error.status);

        }
    }

    async createBike({ name, color, location,isAvailable }): Promise<any> {
        try {
            await AddBikeSchema.validateAsync({ color: color, location: location, name: name });
            const bike = new Bike();
            bike.name = name;
            bike.color = color;
            bike.location = location;
            bike.isAvailable = isAvailable;
            await bike.save();
            console.log(bike);
            return { success: true, statusCode: 201 };
        } catch (error) {
            throw new HttpException(error, error.status);

        }
    }

    async updateBike({ id, name, color, location,isAvailable }): Promise<any> {
        try {
            const bike = await Bike.findOne({ where: { id: id } });
            if (bike) {
                await Bike.update(id, { name, color, location,isAvailable });
                return { success: true, statusCode: 200 }
            }
            else throw new HttpException('Unable to update Bike Invalid bike Id', 400);
        } catch (error) {
            throw new HttpException(error, error.status);


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
            else throw new HttpException('Unable to delete Bike / Bike not Found', 400);
        } catch (error) {
            throw new HttpException(error, error.status);

        }
    }

}