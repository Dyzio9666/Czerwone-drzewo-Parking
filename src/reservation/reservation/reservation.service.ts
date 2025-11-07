import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { reservationsEntity } from 'src/entity/reservations.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationService {
    constructor(
        @InjectRepository(reservationsEntity) private readonly reservationEntity : Repository<reservationsEntity>,
    ){

    }
    
}
