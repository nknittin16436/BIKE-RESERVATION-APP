import { Body, Controller, Get, Post, Param, Delete, Patch, UseGuards, Headers, Query } from '@nestjs/common';
import { CreateReservation, GetReservations } from 'src/dtos/reservation.dto';
import { Success } from 'src/dtos/user.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { AdminRegular } from 'src/guards/adminregular.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { RatingGuard } from 'src/guards/rating.guard';
import { UserReservationGuard } from 'src/guards/UserReservation.guard';
import { ReservationService } from './reservation.service';
// import { RoleGuard } from 'src/guards/role.guard';
@Controller('/reservations')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) { }

    @UseGuards(AdminGuard)
    @Get('')
    getReservations(): Promise<GetReservations> {
        return this.reservationService.getAllReservations();
    }
    @UseGuards(UserReservationGuard)
    @Get('/user')
    getUserReservations(@Query('userId') userId: string): Promise<GetReservations> {
        return this.reservationService.getAllUserReservations(userId);
    }
    @UseGuards(AdminGuard)
    @Get('/bike')
    getBikeReservations(@Query('bikeId') bikeId: string): Promise<GetReservations> {
        return this.reservationService.getAllBikeReservations(bikeId);
    }


    @UseGuards(AuthGuard)
    @Post('')
    createReservation(@Body() createReservationData: CreateReservation, @Headers('authtoken') authtoken: string): Promise<Success> {
        return this.reservationService.createReservation(createReservationData, authtoken);
    }

    @UseGuards(AdminRegular)
    @Get('/:id')
    updateReservation(@Param('id') id: string): Promise<Success> {
        return this.reservationService.updateReservationStatus(id);
    }
    @UseGuards(RatingGuard)
    @Post('/:id')
    updateReservationRating(@Param('id') id: string, @Body('rating') rating: number): Promise<Success> {
        return this.reservationService.updateReservationRating(id, rating);
    }

    // // @UseGuards(RoleGuard)
    @Delete('/:id')
    deleteReservation(@Param('id') id: string): Promise<Success> {
        return this.reservationService.deleteReservation(id);
    }

}
