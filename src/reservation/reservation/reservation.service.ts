import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { reservationsEntity } from 'src/entity/reservations.entity';
import { Repository } from 'typeorm';
export function chracterChange(date : string) : Date{
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

    async makeNewReservation(date : string){

    }
    async checkPossiblePlaces(date : string){
        
        const query = ' ';

    }


}
