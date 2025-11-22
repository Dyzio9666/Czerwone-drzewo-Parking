import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { newReservationDto } from 'src/dto /newreservation.dto';
import { authGuard } from 'src/guards/auth.guard';
import { ReservationService } from './reservation.service';
import { dateDto } from 'src/dto /date.dto';
@UseGuards(authGuard)
@Controller('reservation')
export class ReservationController {
    constructor(
        private readonly reservationService : ReservationService
    ){
        
    }

    @Post('new-reservation')
    async makeNewReservation(@Body()  payload : newReservationDto)
    {
        await this.reservationService.makeNewReservation(payload)
    }
    // format daty dzien/miesiac/rok
    @Get('avaible-places')
    async getAvaibleReservations(@Query() payload : any){
        console.log(payload.date)
        return await this.reservationService.checkPossiblePlaces(payload.date)
    }

    @Delete('delete-reservaiton')
    async deleteReservtion(@Body() payload  :any ){
        return await this.reservationService.deleteReservation(payload.id)
    }
}
