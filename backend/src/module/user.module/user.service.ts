import { Injectable, UnauthorizedException, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { User } from 'src/db/entities/user.entity';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { EmailSchema, LoginSchema, NameSchema, RoleSchema, SignUpSchema } from 'src/JoiSchema/joiSchema';
import { Reservation } from 'src/db/entities/reservation.entity';
import { CreateUser, GetUser, GetUsers, Login, LoginUser, Success, UpdateUser } from 'src/dtos/user.dto';
import { validateUpdateUserData } from 'src/dtos/UtilityFunctions';

@Injectable()
export class UserService {

    async getAllUsers(): Promise<GetUsers> {
        try {
            const users = await User.find({
                relations: {
                    reservations: true,
                }
            });
            return { users, success: true }
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUser(token: string): Promise<GetUser> {
        try {
            var decoded = jwt.verify(token, 'bikeReservation');
            const userId = decoded.id;
            const user = await User.findOne({ where: { id: userId } });

            if (user) {
                delete user.password;
                return { user, success: true }
            }
            else throw new HttpException('User does not exist', 400);
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }


    async createUser(createUserData: CreateUser): Promise<Success> {
        try {
            const insensitiveEmail = createUserData.email.slice(0, createUserData.email.indexOf("@")).toLowerCase() +
                createUserData.email.slice(createUserData.email.indexOf("@"));
            const isUser = await User.findOne({ where: { email: insensitiveEmail } });
            if (isUser) {
                throw new HttpException('Email already Exist', 400);
            }
            try {

                await SignUpSchema.validateAsync({ email: insensitiveEmail, password: createUserData.password, confirmPassword: createUserData.confirmPassword, name: createUserData.name });
            } catch (error) {
                throw new HttpException(error.message, 400);

            }
            const user = new User();
            user.name = createUserData.name.trim();
            user.email = insensitiveEmail;
            const hashedPassword = await bcrypt.hashSync(createUserData.password, 10);
            user.password = hashedPassword;
            await user.save();
            return { success: true };
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }


    async doUserLogin(loginData: LoginUser): Promise<Login> {
        try {
            const insensitiveEmail = loginData.email.slice(0, loginData.email.indexOf("@")).toLowerCase() +
                loginData.email.slice(loginData.email.indexOf("@"));
            try {
                await LoginSchema.validateAsync({ email: insensitiveEmail, password: loginData.password });
            } catch (error) {
                throw new HttpException(error.message, 400);

            }
            const user = await User.findOne({ where: { email: insensitiveEmail } });
            if (user && bcrypt.compareSync(loginData.password, user.password)) {
                const token = jwt.sign({ id: user.id, time: Date.now() }, 'bikeReservation', { expiresIn: '24h' });
                delete user.password;
                return { user, accessToken: token, success: true };
            }
            else throw new HttpException('Invalid email or password', 400);
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }



    async updateUser(id: string, updateUserData: UpdateUser): Promise<Success> {
        console.log("Data", updateUserData);
        const { name, role } = updateUserData
        try {
            if (updateUserData.email) {
                var email = updateUserData.email.slice(0, updateUserData.email.indexOf("@")).toLowerCase() +
                    updateUserData.email.slice(updateUserData.email.indexOf("@"));
            }
            console.log("Before call")
            await validateUpdateUserData(updateUserData);
            console.log("After call")
            const user = await User.findOne({
                where: { id: id }, relations: {
                    reservations: true,
                }
            });
            if (user) {
                await User.update(id, { name, email, role });
                if (updateUserData.name) {
                    const reservations = user.reservations;
                    for (const reservation of reservations) {
                        await Reservation.update(reservation.id, { userName: updateUserData.name.trim() });
                    }
                }
                return { success: true }
            }
            else throw new NotFoundException('User not found');

        } catch (error) {
            if (error.errno === 19) {
                throw new HttpException("Email already Exist", 400);
            }
            throw new HttpException(error.message, error.status);
        }
    }

    async deleteUser(id: string): Promise<Success> {
        try {
            const user = await User.findOne({ where: { id: id } });
            if (user) {
                await User.delete(id);
                return { success: true }
            }
            else throw new HttpException('Unable to delete user', 400);
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }

}