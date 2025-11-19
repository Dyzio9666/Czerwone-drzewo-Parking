import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { reservationsEntity } from 'src/entity/reservations.entity';
import { authGuard } from 'src/guards/auth.guard';
import { Repository } from 'typeorm';

// @UseGuards(authGuard)
@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(reservationsEntity) private readonly reservationEntity : Repository<reservationsEntity>,
    ){}


    async getAllReservations(){
        const currentDate = new Date().getMonth() + 1 + '/' + new Date().getDate() + '/' + new Date().getFullYear();

        console.log(currentDate)
        const query = ` select * from reservations r where r.date = '${currentDate}' `;
        return await this.reservationEntity.query(query)
    }

    async deleteReservation(reservationID : number){
        return await this.reservationEntity.delete({id : reservationID})
    }
}
