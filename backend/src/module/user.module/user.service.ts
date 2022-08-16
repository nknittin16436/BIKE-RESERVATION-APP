import { Injectable, UnauthorizedException, HttpException } from '@nestjs/common';
import { User } from 'src/db/entities/user.entity';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { LoginSchema, SignUpSchema } from 'src/JoiSchema/joiSchema';


@Injectable()
export class UserService {

    async getAllUsers(): Promise<any> {
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

    async getUser(token: string): Promise<any> {
        try {
            var decoded = jwt.verify(token, 'bikeReservation');
            const userId = decoded.id;
            const user = await User.findOne({ where: { id: userId } });

            if (user) {
                delete user.password;
                return { user, success: true, statusCode: 200 }
            }
            throw new HttpException('User does not exist', 400);
        } catch (error) {
            throw new HttpException('User does not exist', 400);
        }
    }


    async createUser(name: string, email: string, password: string, confirmPassword): Promise<any> {
        try {
            await SignUpSchema.validateAsync({ email: email, password: password, confirmPassword: confirmPassword, name: name });
            const user = new User();
            user.name = name;
            user.email = email;
            const hashedPassword = await bcrypt.hashSync(password, 10);
            user.password = hashedPassword;
            await user.save();
            return { success: true, statusCode: 201 };
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }


    async doUserLogin(email: string, password: string): Promise<any> {
        try {
            await LoginSchema.validateAsync({ email: email, password: password });
            const user = await User.findOne({ where: { email: email } });
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({ id: user.id, time: Date.now() }, 'bikeReservation', { expiresIn: '24h' });
                delete user.password;
                return { user, accessToken: token, success: true, statusCode: 200 };
            }
            else throw new HttpException('Invalid email or password', 400);
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }



    async updateUser(id: string, name: string, email: string, role: string): Promise<any> {
        try {
            const user = await User.findOne({ where: { id: id } });
            if (user) {
                await User.update(id, { name, email, role });
                return { success: true, statusCode: 200 }
            }
            else throw new HttpException('Unable to update user', 400);
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }

    async deleteUser(id: string): Promise<any> {
        try {
            const user = await User.findOne({ where: { id: id } });
            if (user) {
                await User.delete(id);
                return { success: true, statusCode: 200 }
            }
            else throw new HttpException('Unable to delete user', 400);
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }

}