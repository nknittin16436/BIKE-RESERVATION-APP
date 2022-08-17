import { Injectable, UnauthorizedException, HttpException } from '@nestjs/common';
import { Bike } from 'src/db/entities/bike.entity';
import { Reservation } from 'src/db/entities/reservation.entity';
import { User } from 'src/db/entities/user.entity';
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

    async createReservation({ bikeId, fromDate, toDate, userId }): Promise<any> {
        try {
            const bike = await Bike.findOne({ where: { id: bikeId } });
            if (!bike) {
                throw new HttpException('Invalid Bike Id', 400);
            }
            const user = await User.findOne({ where: { id: userId } });
            if (!user) {
                throw new HttpException('Invalid User', 400);
            }

            if (fromDate > toDate) {
                throw new HttpException('Enter valid Reservation Duration', 400);
            }
            if (bike && user) {
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
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }

    async updateReservationStatus(id: string): Promise<any> {
        try {
            const reservation = await Reservation.findOne({ where: { id: id } });
            if (reservation) {
                if (reservation.status) {
                    await Reservation.update(id, { status: false });
                }
                return { success: true, statusCode: 200 }
            }
            else throw new HttpException('Unable to update Reservation Status', 400);
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }

    async updateReservationRating({ id, rating }): Promise<any> {
        try {
            if (rating > 0 && rating < 6) {
                const reservation = await Reservation.findOne({ where: { id: id } });
                if (reservation && !reservation.isRated) {
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
            throw new HttpException(error.message, 400);
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
            throw new HttpException(error.message, 400);
        }
    }

}