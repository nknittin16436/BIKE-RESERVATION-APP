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
            throw new Error(error);
        }
    }

    async createReservation({ bikeId, fromDate, toDate, userId }): Promise<any> {
        try {
            const bike = await Bike.findOne({ where: { id: bikeId } });
            const user = await User.findOne({ where: { id: userId } });
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
            }



        } catch (error) {

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





    async updateReservation(id: string): Promise<any> {
        try {
            const reservation = await Reservation.findOne({ where: { id: id } });
            if (reservation) {
                if (reservation.status) {

                    await Reservation.update(id, { status: false });
                }
                return { success: true, statusCode: 200 }
            }
            else throw new HttpException('Unable to update user', 400);
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