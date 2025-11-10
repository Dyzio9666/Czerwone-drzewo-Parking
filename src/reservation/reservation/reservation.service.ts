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
interface places{
    placeChoosen : any}
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
    async checkPossiblePlaces(date : string)  : Promise<number[]>{
        // chracterChange(date);
        // console.log(date)
        let result : number[] = []
        const query = ` select r."placeChoosen"   from reservations r 
        where r."date" = '${date}' `;
        const places = await this.reservationEntity.query<places[]>(query)
        places.forEach(parkingPlace =>{
            // console.log(parkingPlace.placeChoosen)
            result.push(parkingPlace.placeChoosen)
        })
        return result
    }


}
