import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { reservationsEntity } from 'src/entity/reservations.entity';
import { authGuard } from 'src/guards/auth.guard';
import { Repository } from 'typeorm';

@UseGuards(authGuard)
@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(reservationsEntity) private readonly reservationEntity : Repository<reservationsEntity>,
    ){}


    async getAllReservations(){

        return await this.reservationEntity.find()
    }

    async deleteReservation(reservationID : number){
        return await this.reservationEntity.delete({id : reservationID})
    }
}
