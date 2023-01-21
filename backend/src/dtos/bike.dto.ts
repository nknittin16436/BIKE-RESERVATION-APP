import { Bike } from "src/db/entities/bike.entity";

export interface CreateBike {
    name: string;
    color: string;
    location: string;
    isAvailable: boolean;
}

export interface UpdateBike {
    name: string;
    color: string;
    location: string;
    isAvailable: boolean;
}

export interface FilterQuery {
    name?: string;
    color?: string;
    location?: string;
    rating?: number;
    toDate?: string;
    fromDate?: string;
    page?: number;
}


export interface GetBikes {
    bikes: Bike[];
    totalBikes: number;
    success: boolean;
}

