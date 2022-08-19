import { Injectable, UnauthorizedException, HttpException } from '@nestjs/common';
import { Bike } from 'src/db/entities/bike.entity';
import { Reservation } from 'src/db/entities/reservation.entity';
import { User } from 'src/db/entities/user.entity';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment'

@Injectable()
export class ReservationService {

    async getAllReservations(): Promise<any> {
        try {
            const reservations = await Reservation.find();
            return { reservations, success: true }
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }
    async getAllUserReservations(userId): Promise<any> {
        try {
            const reservations = await Reservation.find({ where: { userId: userId } });
            return { reservations, success: true }
        } catch (error) {
            throw new HttpException(error, error.status);

        }
    }
    async getAllBikeReservations(bikeId): Promise<any> {
        try {
            const reservations = await Reservation.find({ where: { bikeId: bikeId } });
            return { reservations, success: true }
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }

    async createReservation({ bikeId, fromDate, toDate, authtoken }): Promise<any> {
        try {
            const bike = await Bike.findOne({
                relations: {
                    reservations: true,
                }, where: { id: bikeId }
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

            if (fromDate < moment(Date.now()).format('YYYY-MM-DD H:mm:ss')) {
                throw new HttpException('Start date should be greater then current date', 400);
            }
            if (fromDate < moment(Date.now()).format('YYYY-MM-DD H:mm:ss') || fromDate > toDate) {
                throw new HttpException('From date cannot be greater than to date', 400);
            }
            let isReservationAvailable = false;
            let reservations = bike.reservations;
            console.log(bike, reservations)
            reservations = reservations.filter(reservation => reservation.status === true)
            if (reservations.length === 0) {
                isReservationAvailable = true;
            }
            let trueCount = 0;
            for (const reservation of reservations) {

                if (fromDate < reservation.fromDate && toDate < reservation.fromDate) {
                    console.log("1");
                    trueCount++;
                }
                if ((fromDate > reservation.fromDate) && (fromDate > reservation.toDate)) {
                    console.log("2", fromDate, reservation);
                    trueCount++;
                }

            }
            if (trueCount === reservations.length) {
                isReservationAvailable = true;
            }

            if (!isReservationAvailable) {
                throw new HttpException('Bike cannot be booked on given duration', 400);

            }
            if (bike.isAvailable) {
                const reservation = new Reservation();
                reservation.bikeName = bike.name;
                reservation.bikeId = bikeId;
                reservation.fromDate = fromDate;
                reservation.toDate = toDate;
                reservation.userId = userId;
                reservation.userName = user.name;
                await reservation.save();
                console.log(reservation);
                return { success: true, statusCode: 201 };
            }
            else throw new HttpException('This bike is Not Available', 400);
        } catch (error) {
            console.log(error)
            throw new HttpException(error, error.status);
        }
    }

    async updateReservationStatus(id: string): Promise<any> {
        try {
            const reservation = await Reservation.findOne({ where: { id: id } });
            if (reservation) {
                if (reservation.status) {
                    await Reservation.update(id, { status: false });
                    return { success: true, statusCode: 200 };
                }
                else throw new HttpException('Cannot cancel an already cancelled Reservation', 400);
            }
            else throw new HttpException('Unable to update Reservation Status Invalid', 400);
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }

    async updateReservationRating({ id, rating }): Promise<any> {
        try {
            if (rating > 0 && rating < 6) {
                const reservation = await Reservation.findOne({ where: { id: id } });
                if (reservation && !reservation.isRated && reservation.status) {
                    await Reservation.update(id, { rating: parseInt(rating), isRated: true });
                    const bike = await Bike.findOne({ where: { id: reservation.bikeId }, relations: { reservations: true, } });
                    console.log(bike);
                    let averageRating = 0;
                    let ratedReservationLength = 0;
                    for (const reservation of bike.reservations) {
                        if (reservation.isRated) {
                            ratedReservationLength++;
                        }
                        averageRating += reservation.rating;
                    }
                    averageRating /= ratedReservationLength;
                    console.log(averageRating);
                    await Bike.update(reservation.bikeId, { averageRating: averageRating });
                    return { success: true, statusCode: 200 }
                }
                else throw new HttpException('Unable to Add Reservation Rating', 400);
            }
            else throw new HttpException('Invalid Rating', 400);

        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }


    async deleteReservation(id: string): Promise<any> {
        try {
            const reservation = await Reservation.findOne({ where: { id: id } });
            if (reservation) {
                await Reservation.delete(id);
                return { success: true, statusCode: 200 }
            }
            else throw new HttpException('Unable to delete user', 400);
        } catch (error) {
            throw new HttpException(error, error.status);

        }
    }

}