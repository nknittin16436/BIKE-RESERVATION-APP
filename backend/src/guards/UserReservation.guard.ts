import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Reservation } from 'src/db/entities/reservation.entity';
import { User } from 'src/db/entities/user.entity';
@Injectable()
export class UserReservationGuard implements CanActivate {
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        try {
            const queryUserId = request.query.userId;
            if (queryUserId) {
                const token = request.headers.authtoken;
                var decoded = jwt.verify(token, 'bikeReservation');
                const userId = decoded.id;
                const user = await User.findOne({ where: { id: userId } });
                if (user && (queryUserId === userId || user.role === "manager")) {
                    return true;
                }
            }
            return false;
        } catch (error) {

            throw new UnauthorizedException();
        }
    }
}