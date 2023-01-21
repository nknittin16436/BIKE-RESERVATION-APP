import { Injectable, HttpException } from '@nestjs/common';
import { Bike } from 'src/db/entities/bike.entity';
import { Reservation } from 'src/db/entities/reservation.entity';
import { User } from 'src/db/entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { CreateReservation, GetReservations } from 'src/dtos/reservation.dto';
import { Success } from 'src/dtos/user.dto';
import { calculateAvergeRating, isBikeAvailable, validateReservaionDate } from 'src/dtos/UtilityFunctions';

@Injectable()
export class ReservationService {

    async getAllReservations(): Promise<GetReservations> {
        try {
            const reservations = await Reservation.find();
            return { reservations, success: true }
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }
    async getAllUserReservations(userId: string): Promise<GetReservations> {
        try {
            const reservations = await Reservation.find({ where: { userId: userId } });
            return { reservations, success: true }
        } catch (error) {
            throw new HttpException(error, error.status);

        }
    }
    async getAllBikeReservations(bikeId: string): Promise<GetReservations> {
        try {
            const reservations = await Reservation.find({ where: { bikeId: bikeId } });
            return { reservations, success: true }
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }

    async createReservation(createReservationData: CreateReservation, authtoken: string): Promise<Success> {
        try {
            const bike = await Bike.findOne({
                relations: {
                    reservations: true,
                }, where: { id: createReservationData.bikeId }
            });
            if (!bike) {
                throw new HttpException('Invalid Bike Id', 400);
            }
            const decoded = jwt.verify(authtoken, 'bikeReservation');
            const userId = decoded.id;
            const user = await User.findOne({ where: { id: userId } });
            if (!user) {
                throw new HttpException('Invalid User', 400);
            }

            validateReservaionDate(createReservationData);

            const isReservationAvailable = isBikeAvailable(createReservationData, bike.reservations);
            if (!isReservationAvailable) {
                throw new HttpException('Bike cannot be booked on given duration', 400);
            }
            if (bike.isAvailable) {
                const reservation = new Reservation();
                reservation.bikeName = bike.name;
                reservation.bikeId = createReservationData.bikeId;
                reservation.fromDate = createReservationData.fromDate;
                reservation.toDate = createReservationData.toDate;
                reservation.userId = userId;
                reservation.userName = user.name;
                await reservation.save();
                return { success: true };
            }
            else throw new HttpException('This bike is Not Available', 400);
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }

    async updateReservationStatus(id: string): Promise<Success> {
        try {
            const reservation = await Reservation.findOne({ where: { id: id } });
            if (reservation) {
                if (reservation.status) {
                    await Reservation.update(id, { status: false });
                    return { success: true };
                }
                else throw new HttpException('Cannot cancel an already cancelled Reservation', 400);
            }
            else throw new HttpException('Unable to update Reservation Status Invalid', 400);
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }

    async updateReservationRating(id: string, rating: number): Promise<Success> {
        try {
            if (rating > 0 && rating < 6) {
                const reservation = await Reservation.findOne({ where: { id: id } });
                if (reservation && !reservation.isRated && reservation.status) {
                    await Reservation.update(id, { rating: rating, isRated: true });
                    const bike = await Bike.findOne({ where: { id: reservation.bikeId }, relations: { reservations: true, } });
                    const averageRating = calculateAvergeRating(bike.reservations);
                    console.log(averageRating);
                    await Bike.update(reservation.bikeId, { averageRating: averageRating });
                    return { success: true }
                }
                else throw new HttpException('Unable to Add Reservation Rating You have already rated or cancelled this reservation', 400);
            }
            else throw new HttpException('Invalid Rating :Rating should be between 1 and 5', 400);

        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }


    async deleteReservation(id: string): Promise<Success> {
        try {
            const reservation = await Reservation.findOne({ where: { id: id } });
            //CHECK IF RESERVATION WITH THAT ID EXISTS OR NOT
            if (reservation) {
                await Reservation.delete(id);
                return { success: true }
            }
            else throw new HttpException('Unable to delete reservation', 400);
        } catch (error) {
            throw new HttpException(error, error.status);

        }
    }

}