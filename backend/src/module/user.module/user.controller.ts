import { Body, Controller, Get, Post, Param, Delete, Patch, UseGuards, Headers, Query } from '@nestjs/common';
import { CreateUser, GetUser, GetUsers, Login, LoginUser, Success, UpdateUser } from 'src/dtos/user.dto';
import { AdminGuard } from 'src/guards/admin.guard';
// import { RoleGuard } from 'src/guards/role.guard';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(AdminGuard)
    @Get('')
    getUsers(): Promise<GetUsers> {
        return this.userService.getAllUsers();
    }

    @Post('/signup')
    createUser(@Body() createUserData: CreateUser): Promise<Success> {
        return this.userService.createUser(createUserData);
    }

    @Post('/login')
    doUserLogin(@Body() loginData: LoginUser): Promise<Login> {
        return this.userService.doUserLogin(loginData);
    }

    @UseGuards(AdminGuard)
    @Patch('/:id')
    doUserUpdate(@Param('id') id: string, @Body() updateUserData: UpdateUser): Promise<Success> {
        return this.userService.updateUser(id, updateUserData);
    }

    @UseGuards(AdminGuard)
    @Delete('/:id')
    deleteUser(@Param('id') id: string): Promise<Success> {
        return this.userService.deleteUser(id);
    }


    @Get('/:token')
    getUser(@Param('token') token: string): Promise<GetUser> {
        return this.userService.getUser(token);
    }

}
