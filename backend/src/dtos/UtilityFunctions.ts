import { Reservation } from "src/db/entities/reservation.entity";
import { CreateReservation } from "./reservation.dto";
import { HttpException } from '@nestjs/common';
import * as moment from 'moment'
import { FilterQuery, UpdateBike } from "./bike.dto";
import { Bike } from "src/db/entities/bike.entity";
import { UpdateUser } from "./user.dto";
import { BikeStatusSchema, ColorSchema, EmailSchema, LocationSchema, NameSchema, RoleSchema } from "src/JoiSchema/joiSchema";


export const calculateAvergeRating = (reservations: Reservation[]): number => {
    let averageRating = 0;
    let ratedReservationLength = 0;
    for (const reservation of reservations) {
        if (reservation.isRated) {
            ratedReservationLength++;
        }
        averageRating += reservation.rating;
    }
    averageRating /= ratedReservationLength;
    return averageRating;
}

export const isBikeAvailable = (createReservationData: CreateReservation, reservations: Reservation[]): boolean => {
    let isReservationAvailable = false;
    reservations = reservations.filter(reservation => reservation.status === true)
    if (reservations.length === 0) {
        isReservationAvailable = true;
    }
    let trueCount = 0;
    for (const reservation of reservations) {

        if (createReservationData.fromDate < reservation.fromDate && createReservationData.toDate < reservation.fromDate) {
            trueCount++;
        }
        if ((createReservationData.fromDate > reservation.fromDate) && (createReservationData.fromDate > reservation.toDate)) {
            trueCount++;
        }
    }
    if (trueCount === reservations.length) {
        isReservationAvailable = true;
    }
    return isReservationAvailable;
}

export const validateReservaionDate = (createReservationData: CreateReservation) => {
    if (!createReservationData.fromDate || !createReservationData.toDate) {
        throw new HttpException('Enter valid from and to date', 400);
    }
    if (createReservationData.fromDate < moment(Date.now()).format('YYYY-MM-DD H:mm:ss')) {
        throw new HttpException('Start date should be greater then current date', 400);
    }
    if (createReservationData.fromDate > createReservationData.toDate) {
        throw new HttpException('From date cannot be greater than to date', 400);
    }
}

export const validateQueryDate = (query: FilterQuery) => {
    if (!query.fromDate || !moment(query.fromDate, 'YYYY-MM-DD H:mm:ss',true).isValid()) {
        throw new HttpException('Enter valid from date', 400);
    }
    if (!query.toDate || !moment(query.toDate, 'YYYY-MM-DD H:mm:ss',true).isValid()) {
        throw new HttpException('Enter valid to date', 400);
    }
    if (!query.fromDate || !query.toDate) {
        throw new HttpException('Enter valid from and to date', 400);
    }
    if (query.fromDate < moment(Date.now()).format('YYYY-MM-DD H:mm:ss')) {
        throw new HttpException('Start date should be greater then current date', 400);
    }
    if (query.fromDate > query.toDate) {
        throw new HttpException('From date cannot be greater than to date', 400);
    }
}

export const filterBikes = (query: FilterQuery, bikes: Bike[]) => {
    let filterdBikes: Bike[] = bikes;
    if (query.rating) {
        filterdBikes = filterdBikes.filter(bike => bike.averageRating >= query.rating);
    }
    if (query.name) {
        filterdBikes = filterdBikes.filter(bike => bike.name.toLowerCase().includes(query.name.toLowerCase()));
    }
    if (query.color) {
        filterdBikes = filterdBikes.filter(bike => bike.color.toLowerCase().includes(query.color.toLowerCase()));
    }
    if (query.location) {
        filterdBikes = filterdBikes.filter(bike => bike.location.toLowerCase().includes(query.location.toLowerCase()));
    }
    return filterdBikes;
}

export const filterBikeWithDate = (query: FilterQuery, bikes: Bike[]) => {
    let filterdBikes: Bike[] = bikes;

    filterdBikes = filterdBikes.filter((bike) => {
        let reservations = bike.reservations;
        reservations = reservations.filter(reservation => reservation.status === true)
        if (reservations.length === 0) {
            return true;
        }
        let trueCount = 0;
        for (const reservation of reservations) {

            if (query.fromDate < reservation.fromDate && query.toDate < reservation.fromDate) {
                trueCount++;
            }
            if ((query.fromDate > reservation.fromDate) && (query.fromDate > reservation.toDate)) {
                trueCount++;
            }
        }
        if (trueCount === reservations.length) {
            return true;
        }
    });
    return filterdBikes;
}


export const validateUpdateUserData = async (updateUserData: UpdateUser) => {
    const { name, email, role } = updateUserData;
    if (name === "" || name) {
        await NameSchema.validateAsync({ name });
    }
    if (email === "" || email) {
        await EmailSchema.validateAsync({ email });
    }
    if (role === "" || role) {
        await RoleSchema.validateAsync({ role });
    }
}

export const validateBikeUpdateData = async (updateBikeData: UpdateBike) => {
    if (updateBikeData.name === "" || updateBikeData.name) {
        await NameSchema.validateAsync({ name: updateBikeData.name.trim() });
    }
    if (updateBikeData.location === "" || updateBikeData.location) {
        await LocationSchema.validateAsync({ location: updateBikeData.location.trim() });
    }
    if (updateBikeData.color === "" || updateBikeData.color) {
        await ColorSchema.validateAsync({ color: updateBikeData.color.trim() });
    }
    if (updateBikeData.isAvailable) {
        await BikeStatusSchema.validateAsync({ isAvailable: updateBikeData.isAvailable });
    }

}

