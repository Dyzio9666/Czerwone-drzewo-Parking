import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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
    async getAvaibleReservations(@Body() payload :dateDto){
        console.log(payload)
        return await this.reservationService.checkPossiblePlaces(payload.date)
    }


}
