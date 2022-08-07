import { Body, Controller, Get, Post, Param, Delete, Patch, UseGuards ,Headers} from '@nestjs/common';
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

    // @UseGuards(RoleGuard)
    @Post('')
    createReservation(@Body() {bikeId,fromDate,toDate,userId}): any {
        return this.reservationService.createReservation({bikeId,fromDate,toDate,userId});
    }

    // // @UseGuards(RoleGuard)
    // @Delete('/:id')
    // deleteUser(@Param('id') id: string): any {
    //     return this.reservationService.deleteUser(id);
    // }
    

    // @Get('/info')
    // getUser(@Headers('authtoken') token:string): any {
    //     return this.reservationService.getUser(token);
    // }

}
