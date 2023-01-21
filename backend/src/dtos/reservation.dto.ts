import { Reservation } from "src/db/entities/reservation.entity";

export interface CreateReservation {
    bikeId: string;
    fromDate: string;
    toDate: string;
}

export interface GetReservations {
    reservations: Reservation[];
    success: boolean;
}