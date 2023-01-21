import { User } from "src/db/entities/user.entity";
export interface CreateUser {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginUser {
    email: string;
    password: string;
}

export interface UpdateUser {
    name?: string;
    email?: string;
    role?: string;
}
export interface GetUsers {
    users: User[];
    success: boolean;
}
export interface Success {
    success: boolean;
}
export interface GetUser {
    success: boolean;
    user: User;
}
export interface Login {
    user: User;
    accessToken: string;
    success: boolean;
}
