import { Body, Controller, Get, Post, Param, Delete, Patch, UseGuards ,Headers, Query} from '@nestjs/common';
// import { RoleGuard } from 'src/guards/role.guard';
import { UserService } from './user.service';
@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    // @UseGuards(RoleGuard)
    @Get('')
    getUsers(): any {
        return this.userService.getAllUsers();
    }

    @Post('/signup')
    createUser(@Body() { name, email,password ,confirmPassword}): any {
        return this.userService.createUser(name, email, password,confirmPassword);
    }

    @Post('/login')
    doUserLogin(@Body() { email, password }): any {
        return this.userService.doUserLogin(email, password);
    }

    // // @UseGuards(RoleGuard)
    @Patch('/:id')
    doUserUpdate(@Param('id') id: string, @Body() { name, email, role }): any {
        return this.userService.updateUser(id, name, email, role);
    }

    // // @UseGuards(RoleGuard)
    // @Delete('/:id')
    // deleteUser(@Param('id') id: string): any {
    //     return this.userService.deleteUser(id);
    // }
    

    // @Get('/info')
    // getUser(@Headers('authtoken') token:string): any {
    //     return this.userService.getUser(token);
    // }

}
