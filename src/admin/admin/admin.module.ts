import { Module, Res } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { reservationsEntity } from 'src/entity/reservations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([reservationsEntity])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
