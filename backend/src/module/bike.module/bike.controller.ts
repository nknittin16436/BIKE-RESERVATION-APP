import { Body, Controller, Get, Post, Param, Delete, Patch, UseGuards, Headers, Query } from '@nestjs/common';
import { CreateBike, FilterQuery, GetBikes, UpdateBike } from 'src/dtos/bike.dto';
import { Success } from 'src/dtos/user.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { BikeService } from './bike.service';
@Controller('/bikes')
export class BikeController {
    constructor(private readonly bikeService: BikeService) { }

    @UseGuards(AuthGuard)
    @Get('')
    getBikes(@Query() query: FilterQuery, @Headers('authtoken') authtoken: string): Promise<GetBikes> {
        return this.bikeService.getAllBikes(query, authtoken);
    }

    @UseGuards(AuthGuard)
    @Get('/filtered')
    getFilteredBikes(@Query() query: FilterQuery, @Headers('authtoken') authtoken: string): Promise<GetBikes> {
        return this.bikeService.getAllFilteredBikes(query, authtoken);
    }


    @UseGuards(AdminGuard)
    @Post('')
    createBike(@Body() createBikeData: CreateBike): Promise<Success> {
        return this.bikeService.createBike(createBikeData);
    }

    @UseGuards(AdminGuard)
    @Patch('/:id')
    updateBike(@Body() updateBikeData: UpdateBike, @Param('id') id: string): Promise<Success> {
        return this.bikeService.updateBike(id, updateBikeData);
    }

    @UseGuards(AdminGuard)
    @Delete('/:id')
    deleteUser(@Param('id') id: string): Promise<Success> {
        return this.bikeService.deleteBike(id);
    }

}
