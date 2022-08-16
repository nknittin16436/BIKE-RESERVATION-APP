import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Reservation } from 'src/db/entities/reservation.entity';
import { User } from 'src/db/entities/user.entity';
@Injectable()
export class RatingGuard implements CanActivate {
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        try {
            const reservationId = request.params.id;
            const reservation = await Reservation.findOne({ where: { id: reservationId } });
            if (reservation) {
                const token = request.headers.authtoken;
                var decoded = jwt.verify(token, 'bikeReservation');
                const userId = decoded.id;
                const user = await User.findOne({ where: { id: userId } });
                console.log(reservation.userId ,userId)
                if (user && reservation.userId === userId) {
                    return true;
                }
            }
            return false;
        } catch (error) {

            throw new UnauthorizedException();
        }
    }
}