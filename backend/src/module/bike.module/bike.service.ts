import { Injectable, HttpException } from '@nestjs/common';
import { Bike } from 'src/db/entities/bike.entity';
import { User } from 'src/db/entities/user.entity';
import { AddBikeSchema, BikeStatusSchema, ColorSchema, LocationSchema, NameSchema } from 'src/JoiSchema/joiSchema';
import * as jwt from 'jsonwebtoken';
import { Reservation } from 'src/db/entities/reservation.entity';
import { CreateBike, FilterQuery, GetBikes, UpdateBike } from 'src/dtos/bike.dto';
import { Success } from 'src/dtos/user.dto';
import { filterBikes, filterBikeWithDate, validateBikeUpdateData, validateQueryDate } from 'src/dtos/UtilityFunctions';
const pageSize = 5;
@Injectable()
export class BikeService {

    async getAllBikes(query: FilterQuery, authtoken: string): Promise<GetBikes> {
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
            return { bikes, totalBikes, success: true }
        } catch (error) {
            throw new HttpException(error, error.status);

        }
    }

    async getAllFilteredBikes(query: FilterQuery, authtoken: string): Promise<GetBikes> {
        console.log(query);
        try {
            var decoded = jwt.verify(authtoken, 'bikeReservation');
            const userId = decoded.id;
            const user = await User.findOne({ where: { id: userId } });
            var bikes = await Bike.find({
                relations: {
                    reservations: true,
                }
            });
            if (user.role === "regular") {
                bikes = bikes.filter((bike) => bike.isAvailable === true)
            }

            bikes = filterBikes(query, bikes);

            if (query.fromDate || query.toDate) {
                validateQueryDate(query);
            }
            if (query.fromDate && query.toDate) {
                bikes = filterBikeWithDate(query, bikes);
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
            return { bikes, totalBikes, success: true }
        } catch (error) {
            console.log(error)
            throw new HttpException(error, error.status);

        }
    }

    async createBike(createBikeData: CreateBike): Promise<Success> {
        try {
            try {
                await AddBikeSchema.validateAsync({ color: createBikeData.color.trim(), location: createBikeData.location.trim(), name: createBikeData.name.trim(), isAvailable: createBikeData.isAvailable });
            } catch (error) {
                throw new HttpException(error.message, 400);
            }
            const bike = new Bike();
            bike.name = createBikeData.name.trim();
            bike.color = createBikeData.color.trim();
            bike.location = createBikeData.location.trim();
            bike.isAvailable = createBikeData.isAvailable;
            await bike.save();
            // console.log(bike);
            return { success: true };
        } catch (error) {
            // console.log(error);
            throw new HttpException(error, error.status);

        }
    }

    async updateBike(id: string, updateBikeData: UpdateBike): Promise<Success> {
        try {
            await validateBikeUpdateData(updateBikeData);
            const bike = await Bike.findOne({
                where: { id: id }, relations: {
                    reservations: true,
                }
            });
            if (bike) {
                await Bike.update(id, { name: updateBikeData.name.trim(), color: updateBikeData.color.trim(), location: updateBikeData.location.trim(), isAvailable: updateBikeData.isAvailable });
                const reservations = bike.reservations;
                for (const reservation of reservations) {
                    await Reservation.update(reservation.id, { bikeName: updateBikeData.name.trim() });
                }
                return { success: true }
            }
            else throw new HttpException('Unable to update Bike Invalid bike Id', 400);
        } catch (error) {
            console.log(error)
            throw new HttpException(error.message, error.status);
        }
    }

    async deleteBike(id: string): Promise<Success> {
        try {
            const bike = await Bike.findOne({ where: { id: id } });
            if (bike) {
                await Bike.delete(id);
                return { success: true }
            }
            else throw new HttpException('Unable to delete Bike / Bike not Found', 400);
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }

}