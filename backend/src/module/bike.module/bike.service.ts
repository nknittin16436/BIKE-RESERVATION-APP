import { Injectable, HttpException } from '@nestjs/common';
import { Bike } from 'src/db/entities/bike.entity';
import { User } from 'src/db/entities/user.entity';
import { AddBikeSchema, BikeStatusSchema, ColorSchema, LocationSchema, NameSchema } from 'src/JoiSchema/joiSchema';
import * as jwt from 'jsonwebtoken';
import { Reservation } from 'src/db/entities/reservation.entity';
const pageSize = 5;
@Injectable()
export class BikeService {

    async getAllBikes({ query, authtoken }): Promise<any> {
        try {
            var decoded = jwt.verify(authtoken, 'bikeReservation');
            const userId = decoded.id;
            const user = await User.findOne({ where: { id: userId } });
            if (user.role === "manager") {
                var bikes = await Bike.find({
                    relations: {
                        reservations: true,
                    }
                });
            }
            if (user.role === "regular") {
                var bikes = await Bike.find();
                bikes = bikes.filter((bike) => bike.isAvailable === true)
            }
            const totalBikes = bikes.length;
            if (query.page && pageSize) {
                bikes = bikes.slice((query.page - 1) * pageSize, query.page * pageSize);
            }
            // console.log(bikes);
            return { bikes, totalBikes, success: true }
        } catch (error) {
            throw new HttpException(error, error.status);

        }
    }

    async getAllFilteredBikes({ query, authtoken }): Promise<any> {
        // console.log(query);
        try {
            var decoded = jwt.verify(authtoken, 'bikeReservation');
            const userId = decoded.id;
            const user = await User.findOne({ where: { id: userId } });
            if (user.role === "manager") {
                var bikes = await Bike.find({
                    relations: {
                        reservations: true,
                    }
                });
            }
            if (user.role === "regular") {
                var bikes = await Bike.find({
                    relations: {
                        reservations: true,
                    }
                });
                bikes = bikes.filter((bike) => bike.isAvailable === true)
            }
            if (query.rating) {

                bikes = bikes.filter(bike => bike.averageRating >= query.rating);
            }
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
                    // console.log(bike.name, reservations)
                    reservations = reservations.filter(reservation => reservation.status === true)
                    if (reservations.length === 0) {
                        return true;
                    }
                    let trueCount = 0;
                    for (const reservation of reservations) {

                        if (query.fromDate < reservation.fromDate && query.toDate < reservation.fromDate) {
                            // console.log("1");
                            trueCount++;
                        }
                        if ((query.fromDate > reservation.fromDate) && (query.fromDate > reservation.toDate)) {
                            // console.log("2", query.fromDate, reservation);
                            trueCount++;
                        }

                    }
                    if (trueCount === reservations.length) {
                        return true;
                    }
                });
            }
            const totalBikes = bikes.length;
            if (query.page && pageSize) {
                bikes = bikes.slice((query.page - 1) * pageSize, query.page * pageSize);
            }
            if (user.role === "regular") {
                bikes.forEach(bike => {
                    delete bike.reservations;
                });
            }

            // console.log(bikes);
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

    async createBike({ name, color, location, isAvailable }): Promise<any> {
        try {
            try {
                await AddBikeSchema.validateAsync({ color: color.trim(), location: location.trim(), name: name.trim(), isAvailable: isAvailable });
            } catch (error) {
                throw new HttpException(error.message, 400);
            }
            const bike = new Bike();
            bike.name = name.trim();
            bike.color = color.trim();
            bike.location = location.trim();
            bike.isAvailable = isAvailable;
            await bike.save();
            // console.log(bike);
            return { success: true, statusCode: 201 };
        } catch (error) {
            // console.log(error);
            throw new HttpException(error, error.status);

        }
    }

    async updateBike({ id, name, color, location, isAvailable }): Promise<any> {
        try {
            try {
                if (name === "" || name) {
                    await NameSchema.validateAsync({ name: name.trim() });
                }
                if (location === "" || location) {
                    await LocationSchema.validateAsync({ location: location.trim() });
                }
                if (color === "" || color) {
                    await ColorSchema.validateAsync({ color: color.trim() });
                }
                if (isAvailable === "" || isAvailable) {
                    await BikeStatusSchema.validateAsync({ isAvailable: isAvailable });
                }
            } catch (error) {
                throw new HttpException(error.message, 400);

            }
            const bike = await Bike.findOne({
                where: { id: id }, relations: {
                    reservations: true,
                }
            });
            if (bike) {
                await Bike.update(id, { name: name.trim(), color: color.trim(), location: location.trim(), isAvailable });
                const reservations = bike.reservations;
                for (const reservation of reservations) {
                    await Reservation.update(reservation.id, { bikeName: name.trim() });
                }
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