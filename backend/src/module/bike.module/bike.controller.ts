import { Body, Controller, Get, Post, Param, Delete, Patch, UseGuards ,Headers} from '@nestjs/common';
import { BikeService } from './bike.service';
// import { RoleGuard } from 'src/guards/role.guard';
@Controller('/bikes')
export class BikeController {
    constructor(private readonly bikeService: BikeService) { }

    // @UseGuards(RoleGuard)
    @Get('')
    getBikes(): any {
        return this.bikeService.getAllBikes();
    }

   

    // @UseGuards(RoleGuard)
    @Post('')
    createBike(@Body() { name, color, location }): any {
        return this.bikeService.createBike({ name, color, location});
    }

    // // @UseGuards(RoleGuard)
    // @Delete('/:id')
    // deleteUser(@Param('id') id: string): any {
    //     return this.bikeService.deleteUser(id);
    // }
    

    // @Get('/info')
    // getUser(@Headers('authtoken') token:string): any {
    //     return this.bikeService.getUser(token);
    // }

}
