import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { newReservationDto } from 'src/dto /newreservation.dto';
import { authGuard } from 'src/guards/auth.guard';
import { ReservationService } from './reservation.service';
@UseGuards(authGuard)
@Controller('reservation')
export class ReservationController {
    constructor(
        private readonly reservationService : ReservationService
    ){

    }

    @Post('new-reservation')
    async make_new_reservation(@Body()  payload : newReservationDto)
    {
        await this.reservationService.makeNewReservation(payload)
    }


}
