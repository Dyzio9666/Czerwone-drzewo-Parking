import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { reservationsEntity } from 'src/entity/reservations.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([reservationsEntity])
  ],
  controllers: [ReservationController],
  providers: [ReservationService]
})
export class ReservationModule {}
