import { Body, Controller, Get, Post, Param, Delete, Patch, UseGuards, Headers, Query } from '@nestjs/common';
import { ReservationService } from './reservation.service';
// import { RoleGuard } from 'src/guards/role.guard';
@Controller('/reservations')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) { }

    // @UseGuards(RoleGuard)
    @Get('')
    getReservations(): any {
        return this.reservationService.getAllReservations();
    }

    @Get('/user')
    getUserReservations(@Query('userId') userId: string): any {
        return this.reservationService.getAllUserReservations(userId);
    }

    @Get('/bike')
    getBikeReservations(@Query('bikeId') bikeId: string): any {
        return this.reservationService.getAllBikeReservations(bikeId);
    }

    @Post('')
    createReservation(@Body() { bikeId, fromDate, toDate, userId }): any {
        return this.reservationService.createReservation({ bikeId, fromDate, toDate, userId });
    }

    // @UseGuards(RoleGuard)
    @Get('/:id')
    updateReservation(@Param('id') id: string): any {
        return this.reservationService.updateReservation(id);
    }

    @Post('/:id')
    updateReservationRating(@Param('id') id: string, @Body() { rating }): any {
        return this.reservationService.updateReservationRating({ id, rating });
    }

    // // @UseGuards(RoleGuard)
    @Delete('/:id')
    deleteUser(@Param('id') id: string): any {
        return this.reservationService.deleteReservation(id);
    }


    // @Get('/info')
    // getUser(@Headers('authtoken') token:string): any {
    //     return this.reservationService.getUser(token);
    // }

}
