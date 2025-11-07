import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from 'src/entity/user.entity';
import { refreshTokenEntity } from 'src/entity/refreshtoken.entity';
import { reservationsEntity } from 'src/entity/reservations.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([userEntity , refreshTokenEntity])
  ], 
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
