import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { newReservationDto } from 'src/dto /newreservation.dto';
import { reservationsEntity } from 'src/entity/reservations.entity';
import { Repository } from 'typeorm';
 function chracterChange(date : string) : Date{
    const changed_date  = date.replace('/','-');
    let new_date = new Date(changed_date);
    return new_date
}
@Injectable()
export class ReservationService {
    constructor(
        @InjectRepository(reservationsEntity) private readonly reservationEntity : Repository<reservationsEntity>,
    ){

    }

    async makeNewReservation(payload : newReservationDto){
        const new_Reservation = await this.reservationEntity.create({made_by : payload.madeByID , date : payload.date, placeChoosen : payload.placeChoosen })
        return this.reservationEntity.save(new_Reservation)
        
        
    }
    async checkPossiblePlaces(date : string) {
        chracterChange(date);
        const query = ' ';
        
    }


}
