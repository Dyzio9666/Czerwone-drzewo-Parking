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
        const query = `select count(r."placeChoosen")   from reservations r 
where r."date" = '${payload.date}' and r."made_by"= '${payload.madeByID}' `;
        const alreadyReserved = await this.reservationEntity.query<any>(query)
        if(alreadyReserved[0].count > 0){
            throw new Error ("User already made reservation for this date")
        }
        const new_Reservation = await this.reservationEntity.create({made_by : payload.madeByID , date : payload.date, placeChoosen : payload.placeChoosen })
        return this.reservationEntity.save(new_Reservation)

        
    }
    async checkPossiblePlaces(date : string)  : Promise<number[]>{
        // chracterChange(date);
        console.log(date)
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

    async deleteReservation(reservationId : number){
        return await this.reservationEntity.delete({id : reservationId})
    }
    async showUserReservations(username : string){
        const currentDate = new Date().getMonth() + 1 + '/' + new Date().getDate() + '/' + new Date().getFullYear();
        console.log(currentDate)
        const query = `
            select r."placeChoosen" , r."date" , r."id" from reservations r where r.made_by = '${username}' and r.date >= '${currentDate}'
        `   
        const data = await this.reservationEntity.query(query)
        return data;

    }
}
